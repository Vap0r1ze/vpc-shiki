const { Plugin } = require('powercord/entities')
const { React, getModule } = require('powercord/webpack')
const { inject, uninject } = require('powercord/injector')
const { getReactInstance } = require('powercord/util')

const Settings = require('./components/Settings.jsx')
const ShikiHighlighter = require('./components/ShikiHighlighter.jsx')
const languages = require('./languages')
const { shiki } = require('./shiki.min.js')

const CDN_PATH = 'https://unpkg.com/shiki@0.9.3/'

shiki.setCDN(CDN_PATH)

module.exports = class ShikiCodeblocks extends Plugin {
  async startPlugin () {
    this.loadStylesheet('style.css')

    powercord.api.settings.registerSettings('vpc-shiki', {
      category: this.entityID,
      label: 'Shiki Codeblocks',
      render: ({ getSetting, updateSetting, toggleSetting }) => React.createElement(Settings, {
        getSetting,
        updateSetting,
        toggleSetting,
        shiki,
        loadHighlighter: this.loadHighlighter.bind(this),
        getHighlighter: this.getHighlighter.bind(this),
        getLang: this.getLang,
        refreshCodeblocks: () => this.forceUpdate()
      })
    })

    await this.loadHighlighter()
    try {
      powercord.pluginManager.disable('pc-codeblocks')
      this.shouldReenablePCCB = true
    } catch {
      this.shouldReenablePCCB = false
    }
    this.patchCodeblocks()
  }

  pluginWillUnload () {
    uninject('vpc-shiki-format')
    powercord.api.settings.unregisterSettings('vpc-shiki')
    if (this.shouldReenablePCCB) powercord.pluginManager.enable('pc-codeblocks')
    this.forceUpdate()
  }

  async loadHighlighter (theme) {
    if (!theme) theme = this.settings.get('theme', shiki.BUNDLED_THEMES[0])
    const customThemeHref = this.settings.get('custom-theme')
    if (customThemeHref) {
      try {
        const tempCDN = customThemeHref.split('/').slice(0, -2).join('/') + '/'
        shiki.setCDN(tempCDN)
        const tempThemeFile = customThemeHref.split('/').slice(-2).join('/')
        const customTheme = await shiki.loadTheme(tempThemeFile)
        shiki.setCDN(CDN_PATH)
        return this.highlighter = await shiki.getHighlighter({
          theme: customTheme,
          langs: languages
        })
      } catch (error) {
        shiki.setCDN(CDN_PATH)
      }
    }

    return this.highlighter = await shiki.getHighlighter({
      theme,
      langs: languages
    })
  }

  async patchCodeblocks () {
    const parser = await getModule([ 'parse', 'parseTopic' ])

    inject('vpc-shiki-format', parser.defaultRules.codeBlock, 'react', (args, res) => {
      this.injectCodeblock(args, res)

      return res
    })

    this.forceUpdate()
  }

  injectCodeblock (args, res) {
    if (!args) return
    res.props.render = () => {
      const { lang, content } = args[0]

      return React.createElement(ShikiHighlighter, {
        lang,
        content,
        getHighlighter: this.getHighlighter.bind(this),
        getLang: this.getLang,
        tryHLJS: this.settings.get('try-hljs', 'never'),
        useDevIcon: this.settings.get('use-devicon', 'false'),
        bgOpacity:  this.settings.get('bg-opacity', 100),
      })
    }
  }

  getHighlighter () {
    return this.highlighter
  }
  getLang (id) {
    return languages.find(lang => [...(lang.aliases || []), lang.id].includes(id))
  }
  forceUpdate () {
    document.querySelectorAll('[id^="chat-messages-"]').forEach(e => getReactInstance(e)?.memoizedProps?.onMouseMove?.())
  }
}
