const { React, i18n: { Messages } } = require('powercord/webpack')
const { SelectInput, TextInput } = require('powercord/components/settings')
const ShikiHighlighter = require('./ShikiHighlighter')
const previewsData = require('../previews')

const ERROR_COLOR = '#f04747'
const CUSTOM_THEME_ISSUES = [
  'Invalid URL.',
  'The theme must be a json file with the vscode color theme schema.',
  'The theme must be accessed with HTTPS.',
]

module.exports = ({
  shiki,
  loadHighlighter,
  getHighlighter,
  getLangName
}) => {
  return class Settings extends React.PureComponent {
    state = {
      isCustomThemeValid: true,
      customThemeIssue: null,
      customThemeHref: this.props.getSetting('custom-theme', ''),
    }

    humanizeTheme (theme) {
      return theme.split(/[^a-zA-Z0-9]/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
    }
    getCustomThemeIssue (href) {
      if (!href) return 0
      try {
        const url = new URL(href)
        if (!url.pathname.endsWith('.json')) return 2
        if (url.protocol !== 'https:') return 3
      } catch (error) {
        return 1
      }
      return 0
    }

    render () {
      const { getSetting, updateSetting } = this.props

      const previews = previewsData.map(data => (
        <ShikiHighlighter
          key={`preview-${Date.now()}`}
          lang={data.lang}
          content={data.content}
          getHighlighter={getHighlighter}
          getLangName={getLangName}
          isPreview={true}
        />
      ))

      let customThemeLabel = 'Custom Theme'
      if (this.state.customThemeIssue) {
        customThemeLabel = <span style={{ color: ERROR_COLOR }}>
          {customThemeLabel}
          <span style={{
            fontSize: '12px',
            fontWeight: '500',
            fontStyle: 'italic',
            textTransform: 'none',
          }}>
            <span style={{ padding: '0 4px' }}>-</span>
            {this.state.customThemeIssue}
          </span>
        </span>
      }

      return (
        <div>
          {...previews}
          <SelectInput
            onChange={({ value }) => {
              updateSetting('theme', value)
              loadHighlighter().then(() => {
                this.forceUpdate()
              })
            }}
            options={shiki.BUNDLED_THEMES.map(theme => ({
              label: this.humanizeTheme(theme),
              value: theme,
            }))}
            value={getSetting('theme', shiki.BUNDLED_THEMES[0])}
            searchable={true}
            required={true}
            disabled={!!getSetting('custom-theme')}
          >
            Theme
          </SelectInput>
          <TextInput
            style={!this.state.isCustomThemeValid ? { borderColor: ERROR_COLOR } : {}}
            onChange={value => {
              const issue = this.getCustomThemeIssue(value)
              this.state.customThemeHref = value
              if (!issue) {
                updateSetting('custom-theme', value)
                loadHighlighter().then(() => {
                  this.forceUpdate()
                })
                this.state.isCustomThemeValid = true
                this.state.customThemeIssue = null
              } else {
                this.state.isCustomThemeValid = false
                this.state.customThemeIssue = CUSTOM_THEME_ISSUES[issue - 1]
              }
              this.setState(this.state)
              this.forceUpdate()
            }}
            placeholder="https://raw.githubusercontent.com/millsp/material-candy/master/material-candy.json"
            value={this.state.customThemeHref}
          >
            {customThemeLabel}
          </TextInput>
        </div>
      )
    }
  }
}
