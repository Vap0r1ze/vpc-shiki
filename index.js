const { Plugin } = require('powercord/entities')
const { React, getModule } = require('powercord/webpack')
const { inject, uninject } = require('powercord/injector')
const { getReactInstance } = require('powercord/util')

const Settings = require('./components/Settings.jsx')
const ShikiHighlighter = require('./components/ShikiHighlighter.jsx')
const languages = require('./languages')
const themes = require('./themes')
const shiki = require('./modules/shiki')

module.exports = class ShikiCodeblocks extends Plugin {
  async startPlugin () {
    window.shiki = shiki
    // return
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
        getLang: this.getLang,
        refreshCodeblocks: () => this.forceUpdate()
      })
    })

    await shiki.init()
    await this.loadHighlighter()
    this.patchCodeblocks()
  }

  pluginWillUnload () {
    uninject('vpc-shiki-format')
    powercord.api.settings.unregisterSettings('vpc-shiki')
    this.forceUpdate()
  }

  async loadHighlighter (theme) {
    if (!theme) theme = this.settings.get('theme', Object.keys(themes)[0])
    if (typeof theme === 'string') theme = (themes[theme] ?? Object.values(themes)[0]).data
    const customThemeUrl = this.settings.get('custom-theme')
    if (customThemeUrl) {
      try {
        theme = await shiki.getThemeByUrl(customThemeUrl)
      } catch (error) {
        console.error(error)
      }
    }

    return await shiki.setHighlighter({
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
        shiki,
        getLang: this.getLang,
        tryHLJS: this.settings.get('try-hljs', 'never'),
        useDevIcon: this.settings.get('use-devicon', 'false'),
        bgOpacity:  this.settings.get('bg-opacity', 100),
      })
    }
  }

  getLang (id) {
    return languages.find(lang => [...(lang.aliases || []), lang.id].includes(id))
  }
  forceUpdate () {
    document.querySelectorAll('[id^="chat-messages-"]').forEach(e => getReactInstance(e)?.memoizedProps?.onMouseMove?.())
  }
}
