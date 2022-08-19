const fs = require('fs').promises
const { resolve } = require('path')

module.exports = {
  'dark-plus': {
    name: 'Dark Plus',
    dataFile: 'dark-plus.json'
  },
  'dracula-soft': {
    name: 'Dracula Soft',
    dataFile: 'dracula-soft.json'
  },
  'dracula': {
    name: 'Dracula',
    dataFile: 'dracula.json'
  },
  'github-dark-dimmed': {
    name: 'Github Dark Dimmed',
    dataFile: 'github-dark-dimmed.json'
  },
  'github-dark': {
    name: 'Github Dark',
    dataFile: 'github-dark.json'
  },
  'github-light': {
    name: 'Github Light',
    dataFile: 'github-light.json'
  },
  'light-plus': {
    name: 'Light Plus',
    dataFile: 'light-plus.json'
  },
  'material-darker': {
    name: 'Material Darker',
    dataFile: 'material-darker.json'
  },
  'material-default': {
    name: 'Material Default',
    dataFile: 'material-default.json'
  },
  'material-lighter': {
    name: 'Material Lighter',
    dataFile: 'material-lighter.json'
  },
  'material-ocean': {
    name: 'Material Ocean',
    dataFile: 'material-ocean.json'
  },
  'material-palenight': {
    name: 'Material Palenight',
    dataFile: 'material-palenight.json'
  },
  'min-dark': {
    name: 'Min Dark',
    dataFile: 'min-dark.json'
  },
  'min-light': {
    name: 'Min Light',
    dataFile: 'min-light.json'
  },
  'monokai': {
    name: 'Monokai',
    dataFile: 'monokai.json'
  },
  'nord': {
    name: 'Nord',
    dataFile: 'nord.json'
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    dataFile: 'one-dark-pro.json'
  },
  'poimandres': {
    name: 'Poimandres',
    dataFile: 'poimandres.json'
  },
  'rose-pine-dawn': {
    name: 'Rose Pine Dawn',
    dataFile: 'rose-pine-dawn.json'
  },
  'rose-pine-moon': {
    name: 'Rose Pine Moon',
    dataFile: 'rose-pine-moon.json'
  },
  'rose-pine': {
    name: 'Rose Pine',
    dataFile: 'rose-pine.json'
  },
  'slack-dark': {
    name: 'Slack Dark',
    dataFile: 'slack-dark.json'
  },
  'slack-ochin': {
    name: 'Slack Ochin',
    dataFile: 'slack-ochin.json'
  },
  'solarized-dark': {
    name: 'Solarized Dark',
    dataFile: 'solarized-dark.json'
  },
  'solarized-light': {
    name: 'Solarized Light',
    dataFile: 'solarized-light.json'
  },
  'vitesse-dark': {
    name: 'Vitesse Dark',
    dataFile: 'vitesse-dark.json'
  },
  'vitesse-light': {
    name: 'Vitesse Light',
    dataFile: 'vitesse-light.json'
  },
  'css-variables': {
    name: 'CSS Variables',
    dataFile: 'css-variables.json'
  },
}

module.exports.loadData = id => {
  if (module.exports[id].data) return Promise.resolve(module.exports[id].data)
  const theme = module.exports[id]
  if (!theme) throw new Error(`Could not find load data of invalid theme "${id}"`)
  return fs.readFile(resolve(__dirname, theme.dataFile), 'utf-8')
    .then(json => module.exports[id].data = JSON.parse(json))
}
