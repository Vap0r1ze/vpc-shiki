const { Plugin } = require('powercord/entities')
const { React, getModule } = require('powercord/webpack')
const { inject, uninject } = require('powercord/injector')
const { getReactInstance } = require('powercord/util')

const Settings = require('./components/Settings.jsx')
const ShikiHighlighter = require('./components/ShikiHighlighter.jsx')
const shiki = require('./modules/shiki')

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
        setTheme: this.setTheme.bind(this),
        refreshCodeblocks: () => this.forceUpdate()
      })
    })

    await shiki.init()
    await this.setTheme()
    this.patchCodeblocks()
  }

  pluginWillUnload () {
    uninject('vpc-shiki-format')
    powercord.api.settings.unregisterSettings('vpc-shiki')
    this.forceUpdate()
  }

  async setTheme (themeId) {
    if (!themeId) themeId = this.settings.get('theme', Object.keys(shiki.themes)[0])
    const customThemeUrl = this.settings.get('custom-theme')
    if (customThemeUrl) {
      try {
        await shiki.loadTheme(customThemeUrl)
        themeId = customThemeUrl
      } catch (error) {
        console.error(error)
      }
    }

    return await shiki.setTheme(themeId)
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
        tryHLJS: this.settings.get('try-hljs', 'never'),
        useDevIcon: this.settings.get('use-devicon', 'false'),
        bgOpacity:  this.settings.get('bg-opacity', 100),
      })
    }
  }

  forceUpdate () {
    document.querySelectorAll('[id^="chat-messages-"]').forEach(e => getReactInstance(e)?.memoizedProps?.onMouseMove?.())
  }
}
