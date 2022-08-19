const fs = require('fs')
const path = require('path')

const languages = require('../languages')
const themes = require('../themes')

const createWorkerWithImports = async (scriptPath, imports = []) => {
  const scripts = await Promise.all([
    ...imports.map(url => {
      return fetch(url).then(res => res.text())
    }),
    fs.promises.readFile(scriptPath, 'utf-8')
  ])
  const workerScript = scripts.join(';\n')
  const workerURI = `data:application/javascript;base64,${Buffer.from(workerScript).toString('base64')}`
  return new Worker(workerURI)
}

module.exports = Object.create({
  async init() {
    const worker = this.worker = await createWorkerWithImports(
      path.join(__dirname, 'shiki.worker.js'),
      ['https://unpkg.com/vpc-shiki-renderer@0.10.3/dist/index.iife.js']
    )

    worker.addEventListener('message', ({ data: res }) => {
      if (!this.callbacks[res.nonce]) return

      this.callbacks[res.nonce](res)
      delete this.callbacks[res.nonce]
    })

    await this.loadOniguruma()
    await this.loadHighlighter()
  },

  _serializeJson(json) {
    const str = JSON.stringify(json)
    return str
  },
  _deserializeJson(str) {
    return JSON.parse(str)
  },
  _setCallback(nonce, cb, timeoutCb) {
    this.callbacks[nonce] = cb
    setTimeout(() => {
      if (!this.callbacks[nonce]) return
      delete this.callbacks[nonce]
      timeoutCb()
    }, this.timeoutMs)
  },
  _promisifyCommand({ cmd, args = {}, nonce }, transferables) {
    return new Promise((resolve, reject) => {
      this._setCallback(nonce, res => {
        if (res.evt === 'ERROR')
          return reject(new Error(`[ShikiWorker: ${res.data.type}] ${res.data.message}`))
        resolve(res)
      }, () => {
        reject(new Error(`[ShikiWorker: RPCError] "${cmd}" command timed out`))
      })

      this.worker.postMessage({ cmd, args, nonce }, transferables)
    })
  },
  runCommand(cmd, args, transferables) {
    const nonce = Math.random().toString(16).slice(2)
    return this._promisifyCommand({ cmd, args, nonce }, transferables)
  },

  async loadOniguruma() {
    const wasmBuffer = await fetch('https://unpkg.com/vpc-shiki-renderer@0.10.3/dist/onig.wasm').then(res => res.arrayBuffer())
    await this.runCommand('setWasm', { wasm: wasmBuffer }, [wasmBuffer])
  },
  async loadHighlighter() {
    const themeId = Object.keys(themes)[0]
    await themes.loadData(themeId)
    const theme = themes[themeId].data

    await this.runCommand('setHighlighter', { theme, langs: [] })

    this.loadedThemes[themeId] = true

    await this.setTheme(themeId)
  },
  async loadTheme(themeId) {
    if (this.loadedThemes[themeId]) return

    let theme = themeId

    if (themes[themeId]) {
      await themes.loadData(themeId)
      theme = themes[themeId].data
    }
    
    await this.runCommand('loadTheme', { theme })

    this.loadedThemes[themeId] = true
  },
  async setTheme(themeId) {
    if (!this.loadedThemes[themeId]) {
      await this.loadTheme(themeId)
    }

    this.currentThemeId = themeId
    const { data: { themeData } } = await this.runCommand('getTheme', { theme: themeId })
    this.currentTheme = JSON.parse(themeData)
  },
  async loadLang(langId) {
    const lang = this.resolveLang(langId)

    if (!lang || this.loadedLangs[lang.id]) return

    await languages.loadGrammar(lang.id)

    await this.runCommand('loadLanguage', { lang })
    this.loadedLangs[lang.id] = true
  },
  async tokenizeCode(code, langId) {
    const lang = this.resolveLang(langId)
    if (!this.loadedLangs[lang.id]) {
      await this.loadLang(lang.id)
    }

    const { data: tokens } = await this.runCommand('codeToThemedTokens', { code, lang: langId, theme: this.currentThemeId })
    return tokens
  },

  resolveLang(id) {
    return languages.find(lang => [...(lang.aliases || []), lang.id].includes(id))
  },
}, {
  currentTheme: { value: null, writable: true },
  currentThemeId: { value: null, writable: true },
  timeoutMs: { value: 10000, writable: true },
  worker: { value: null, writable: true },
  callbacks: { value: {} },
  languages: { value: languages },
  themes: { value: themes },
  loadedThemes: { value: {} },
  loadedLangs: { value: {} },
})
