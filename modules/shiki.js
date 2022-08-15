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
  },

  _setCallback(nonce, cb, timeoutCb) {
    this.callbacks[nonce] = cb
    setTimeout(() => {
      if (!this.callbacks[nonce]) return
      delete this.callbacks[nonce]
      timeoutCb()
    }, this.TIMEOUT_MS)
  },
  _promisifyCommand({ cmd, args = {}, nonce }) {
    return new Promise((resolve, reject) => {
      this._setCallback(nonce, res => {
        if (res.evt === 'ERROR')
          return reject(new Error(`[ShikiWorker: ${res.data.type}] ${res.data.message}`))
        resolve(res)
      }, () => {
        reject(new Error('Shiki Worker command timed out'))
      })

      this.worker.postMessage({ cmd, args, nonce })
    })
  },
  runCommand(cmd, args) {
    const nonce = Math.random().toString(16).slice(2)
    return this._promisifyCommand({ cmd, args, nonce })
  },
}, {
  TIMEOUT_MS: { value: 10000, writable: true },
  worker: { value: null, writable: true },
  callbacks: { value: {} },
})
