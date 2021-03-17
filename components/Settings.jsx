const { React } = require('powercord/webpack')
const { SelectInput, TextInput, SwitchItem, RadioGroup } = require('powercord/components/settings')
const { Spinner } = require('powercord/components')
const { sleep } = require('powercord/util')
const ShikiHighlighter = require('./ShikiHighlighter')
const previewsData = require('../previews')

const ERROR_COLOR = '#f04747'
const CUSTOM_THEME_ISSUES = [
  'Invalid URL.',
  'The theme must be a json file with the vscode color theme schema.',
  'The theme must be accessed with HTTPS.',
]
const LOAD_PADDING = 250

module.exports = class Settings extends React.PureComponent {
  state = {
    isThemeLoading: false,
    isCustomThemeValid: true,
    customThemeIssue: null,
    lastEdited: Date.now(),
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
  padPromise (promise) { // https://i.imgur.com/G7Qmfxj.png
    return Promise.all([promise, sleep(LOAD_PADDING)])
  }

  render () {
    const {
      getSetting,
      updateSetting,
      toggleSetting,
      shiki,
      loadHighlighter,
      getHighlighter,
      getLangName,
      refreshCodeblocks
    } = this.props

    if (!this.state.isThemeLoading && !getHighlighter()) {
      this.setState({ isThemeLoading: true })
      loadHighlighter().then(() => {
        this.setState({ isThemeLoading: false })
      })
    }

    const previews = previewsData.map(data => (
      <ShikiHighlighter
        key={`preview-${Date.now()}`}
        lang={data.lang}
        content={data.content}
        getHighlighter={getHighlighter}
        getLangName={getLangName}
        isPreview={true}
        tryHLJS={getSetting('try-hljs')}
      >
        {this.state.isThemeLoading ? (
          <div class="vpc-shiki-spinner-container">
            <Spinner type="spinningCircle"/>
          </div>
        ) : null}
      </ShikiHighlighter>
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
            this.setState({ isThemeLoading: true })
            this.padPromise(loadHighlighter()).then(() => {
              this.setState({ isThemeLoading: false })
              refreshCodeblocks()
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
            if (!issue) {
              updateSetting('custom-theme', value)
              this.padPromise(loadHighlighter()).then(() => {
                this.setState({ isThemeLoading: false })
                refreshCodeblocks()
              })
              this.setState({
                isThemeLoading: true,
                lastEdited: Date.now(),
                isCustomThemeValid: true,
                customThemeIssue: null,
              })
            } else {
              this.setState({
                isThemeLoading: false,
                lastEdited: Date.now(),
                isCustomThemeValid: false,
                customThemeIssue: CUSTOM_THEME_ISSUES[issue - 1],
              })
            }
          }}
          placeholder="https://raw.githubusercontent.com/millsp/material-candy/master/material-candy.json"
          value={getSetting('custom-theme')}
        >
          {customThemeLabel}
        </TextInput>
        <RadioGroup
          value={getSetting('try-hljs', 'never')}
          onChange={({ value }) => {
            updateSetting('try-hljs', value)
            this.setState({ lastEdited: Date.now() })
          }}
          options={[
            {
              name: 'Never',
              desc: 'Always use the shiki highlighter.',
              value: 'never'
            },
            {
              name: 'As Primary',
              desc: 'Use the default highlighter with supported langauges, with shiki as a fallback.',
              value: 'primary'
            },
            {
              name: 'As Secondary',
              desc: 'Use the default highlighter only with langauges missing in this plugin but supported by default.',
              value: 'secondary'
            },
            {
              name: 'Always',
              desc: 'Always use the default highlighter.',
              value: 'always'
            }
          ]}
          note={<>Uses the more lightweight, <b>unthemed</b> default highlighter.</>}
        >
          Use Default Highlighter
        </RadioGroup>
      </div>
    )
  }
}
