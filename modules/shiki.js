const fs = require('fs')
const path = require('path')

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
      ['https://unpkg.com/vpc-shiki-renderer@0.10.2/dist/index.iife.js']
    )

    worker.addEventListener('message', ({ data: res }) => {
      if (!this.callbacks[res.nonce]) return

      this.callbacks[res.nonce](res)
      delete this.callbacks[res.nonce]
    })

    await this.loadOniguruma()
  },

  _deserializeJson(buffer) {
    const str = String.fromCharCode.apply(null, buffer)
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
    const wasmBuffer = await fetch('https://unpkg.com/vpc-shiki-renderer@0.10.2/dist/onig.wasm').then(res => res.arrayBuffer())
    await this.runCommand('setWasm', { wasm: wasmBuffer }, [wasmBuffer])
  },
  async getThemeByUrl(themeUrl) {
    const { data } = await this.runCommand('loadTheme', { theme: themeUrl })
    const theme = this._deserializeJson(data.themeBuffer)
    return theme
  },
  async setHighlighter(options) {
    await this.runCommand('setHighlighter', { ...options })
    this.currentTheme = options.theme
  },
  async tokenizeCode(code, lang) {
    const { data: tokens } = await this.runCommand('codeToThemedTokens', { code, lang })
    return tokens
  },
}, {
  currentTheme: { value: null, writable: true },
  timeoutMs: { value: 10000, writable: true },
  worker: { value: null, writable: true },
  callbacks: { value: {} },
})
