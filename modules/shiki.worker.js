let highlighter

const handlers = {
  onError(error) {
    this.evt = 'ERROR'
    this.data.type = error.constructor.name
    this.data.message = error.message
  },
  setWasm({ wasm }) {
    shiki.setWasm(wasm)
  },
  async setHighlighter({ theme, langs }) {
    highlighter = await shiki.getHighlighter({ theme, langs })
  },
  async loadTheme({ theme }) {
    await highlighter.loadTheme(theme)
  },
  async getTheme({ theme }) {
    this.data.themeData = JSON.stringify(highlighter.getTheme(theme))
  },
  async loadLanguage({ lang }) {
    await highlighter.loadLanguage(lang)
  },
  async codeToThemedTokens({ code, lang, theme }) {
    this.data = await highlighter.codeToThemedTokens(code, lang, theme)
  },
}

const runHandler = async function(h, args) {
  if (!h) throw new Error(`"${this.cmd}" is not a command`)
  return await h.call(this, args)
}

onmessage = ({ data: { cmd, args = {}, nonce } }) => {
  const data = {}
  const res = { cmd, evt: null, data, nonce }

  const onError = handlers.onError.bind(res)
  const handler = handlers[cmd]?.bind(res)

  runHandler.call(res, handler, args).catch(error => {
    if (error instanceof Error)
      onError(error)
    else
      onError(new Error(`${error}`))
  }).then(() => {
    const { transferables } = res
    if (transferables) delete res.transferables
    postMessage(res, transferables)
  })
}
