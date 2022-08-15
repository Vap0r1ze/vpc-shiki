const handlers = {
  onError(error) {
    this.evt = 'ERROR'
    this.data.type = error.constructor.name
    this.data.message = error.message
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
    postMessage(res)
  })
}
