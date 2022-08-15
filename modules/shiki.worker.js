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
  async loadTheme({ theme }) {
    const themeData = await shiki.loadTheme(theme)
    const themeBuffer = this.data.themeBuffer = serializeJson(themeData)
    this.transferables = [ themeBuffer.buffer ]
  },
  async setHighlighter({ theme, langs }) {
    highlighter = await shiki.getHighlighter({ theme, langs })
  },
  async codeToThemedTokens({ code, lang }) {
    this.data = await highlighter.codeToThemedTokens(code, lang)
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

function serializeJson(json) {
  const str = JSON.stringify(json)
  const uintArray = []
  const len = str.length

  let i = -1

  while (++i < len) {
    uintArray[i] = str.charCodeAt(i)
  }

  return new Uint8Array(uintArray)
}
