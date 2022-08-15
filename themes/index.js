const fs = require('fs')
const { resolve } = require('path')

function loadJSON (fileName) {
  return JSON.parse(fs.readFileSync(resolve(__dirname, fileName)))
}

module.exports = {
  'dark-plus': {
    name: 'Dark Plus',
    data: loadJSON('dark-plus.json')
  },
  'dracula-soft': {
    name: 'Dracula Soft',
    data: loadJSON('dracula-soft.json')
  },
  'dracula': {
    name: 'Dracula',
    data: loadJSON('dracula.json')
  },
  'github-dark-dimmed': {
    name: 'Github Dark Dimmed',
    data: loadJSON('github-dark-dimmed.json')
  },
  'github-dark': {
    name: 'Github Dark',
    data: loadJSON('github-dark.json')
  },
  'github-light': {
    name: 'Github Light',
    data: loadJSON('github-light.json')
  },
  'light-plus': {
    name: 'Light Plus',
    data: loadJSON('light-plus.json')
  },
  'material-darker': {
    name: 'Material Darker',
    data: loadJSON('material-darker.json')
  },
  'material-default': {
    name: 'Material Default',
    data: loadJSON('material-default.json')
  },
  'material-lighter': {
    name: 'Material Lighter',
    data: loadJSON('material-lighter.json')
  },
  'material-ocean': {
    name: 'Material Ocean',
    data: loadJSON('material-ocean.json')
  },
  'material-palenight': {
    name: 'Material Palenight',
    data: loadJSON('material-palenight.json')
  },
  'min-dark': {
    name: 'Min Dark',
    data: loadJSON('min-dark.json')
  },
  'min-light': {
    name: 'Min Light',
    data: loadJSON('min-light.json')
  },
  'monokai': {
    name: 'Monokai',
    data: loadJSON('monokai.json')
  },
  'nord': {
    name: 'Nord',
    data: loadJSON('nord.json')
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    data: loadJSON('one-dark-pro.json')
  },
  'poimandres': {
    name: 'Poimandres',
    data: loadJSON('poimandres.json')
  },
  'rose-pine-dawn': {
    name: 'Rose Pine Dawn',
    data: loadJSON('rose-pine-dawn.json')
  },
  'rose-pine-moon': {
    name: 'Rose Pine Moon',
    data: loadJSON('rose-pine-moon.json')
  },
  'rose-pine': {
    name: 'Rose Pine',
    data: loadJSON('rose-pine.json')
  },
  'slack-dark': {
    name: 'Slack Dark',
    data: loadJSON('slack-dark.json')
  },
  'slack-ochin': {
    name: 'Slack Ochin',
    data: loadJSON('slack-ochin.json')
  },
  'solarized-dark': {
    name: 'Solarized Dark',
    data: loadJSON('solarized-dark.json')
  },
  'solarized-light': {
    name: 'Solarized Light',
    data: loadJSON('solarized-light.json')
  },
  'vitesse-dark': {
    name: 'Vitesse Dark',
    data: loadJSON('vitesse-dark.json')
  },
  'vitesse-light': {
    name: 'Vitesse Light',
    data: loadJSON('vitesse-light.json')
  },
  'css-variables': {
    name: 'CSS Variables',
    data: loadJSON('css-variables.json')
  },
}
