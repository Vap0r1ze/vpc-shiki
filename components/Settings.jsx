const { React } = require('powercord/webpack')
const { SelectInput, TextInput, SwitchItem, RadioGroup, SliderInput } = require('powercord/components/settings')
const { Spinner } = require('powercord/components')
const { sleep } = require('powercord/util')
const ShikiHighlighter = require('./ShikiHighlighter')
const themes = require('../themes')
const previewsData = require('../previews')

const ERROR_COLOR = 'var(--text-danger)'
const CUSTOM_THEME_ISSUES = [
  'Invalid URL.',
  'The theme must be a json file with the vscode color theme schema.',
  'The theme must be accessed with HTTPS.',
]
const LOAD_PADDING = 250

module.exports = class Settings extends React.PureComponent {
  state = {
    themeLoadingCauses: [],
    isCustomThemeValid: true,
    customThemeIssue: null,
    lastEdited: Date.now(),
  }
  debounces = {}

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
  addLoadingCause (cause) {
    const { themeLoadingCauses } = this.state
    if (themeLoadingCauses.indexOf(cause) === -1) {
      this.setState({
        themeLoadingCauses: [...themeLoadingCauses, cause]
      })
      return true
    }
    return false
  }
  removeLoadingCause (cause) {
    const { themeLoadingCauses } = this.state
    const index = themeLoadingCauses.indexOf(cause)
    if (index >= 0) {
      this.setState({
        themeLoadingCauses: themeLoadingCauses.slice(0, index)
          .concat(...themeLoadingCauses.slice(index + 1))
      })
      return true
    }
    return false
  }
  debounce (id, fn, wait) {
    if (!this.debounces[id]) {
      this.debounces[id] = _.debounce(fn => fn(), wait)
    }
    this.debounces[id](fn)
  }

  render () {
    const {
      getSetting,
      updateSetting,
      loadHighlighter,
      getHighlighter,
      getLang,
      refreshCodeblocks
    } = this.props

    if (!this.state.themeLoadingCauses.length && !getHighlighter()) {
      const highlighterCause = Date.now()
      this.addLoadingCause(highlighterCause)
      loadHighlighter().then(() => {
        this.removeLoadingCause(highlighterCause)
      })
    }

    const previews = previewsData.map(data => (
      <ShikiHighlighter
        lang={data.lang}
        content={data.content}
        getHighlighter={getHighlighter}
        getLang={getLang}
        isPreview={true}
        tryHLJS={getSetting('try-hljs', 'never')}
        useDevIcon={getSetting('use-devicon', 'false')}
        bgOpacity={getSetting('bg-opacity', 100)}
      >
        {this.state.themeLoadingCauses.length ? (
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
            const themeCause = Date.now()
            this.addLoadingCause(themeCause)
            this.padPromise(loadHighlighter()).then(() => {
              this.removeLoadingCause(themeCause)
              refreshCodeblocks()
            })
          }}
          options={Object.keys(themes).map(theme => ({
            label: themes[theme],
            value: theme,
          }))}
          value={getSetting('theme', Object.keys(themes)[0])}
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
              const themeCause = Date.now()
              this.addLoadingCause(themeCause)
              this.padPromise(loadHighlighter()).then(() => {
                this.removeLoadingCause(themeCause)
                refreshCodeblocks()
              })
              this.setState({
                lastEdited: Date.now(),
                isCustomThemeValid: true,
                customThemeIssue: null,
              })
            } else {
              this.setState({
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
              value: 'never'
            },
            {
              name: 'As Secondary',
              desc: 'Use the default highlighter only with langauges missing in this plugin but supported by default.',
              value: 'secondary'
            },
            {
              name: 'As Primary',
              desc: 'Use the default highlighter with supported langauges, with shiki as a fallback.',
              value: 'primary'
            },
            {
              name: 'Always',
              value: 'always'
            }
          ]}
          note={<>Uses the more lightweight, <b>unthemed</b> default highlighter.</>}
        >
          Use Default Highlighter
        </RadioGroup>
        <RadioGroup
          value={getSetting('use-devicon', 'false')}
          onChange={({ value }) => {
            updateSetting('use-devicon', value)
            this.setState({ lastEdited: Date.now() })
          }}
          options={[
            {
              name: 'Disabled',
              value: 'false'
            },
            {
              name: 'Colorless',
              value: 'colorless'
            },
            {
              name: 'Colored',
              value: 'colored'
            }
          ]}
        >
          Icons
        </RadioGroup>
        <SliderInput
          initialValue={getSetting('bg-opacity', 100)}
          onValueChange={value => {
            updateSetting('bg-opacity', value)
            if (this.addLoadingCause('bgOpacity')) {
              this.setState({ lastEdited: Date.now() })
            }
            this.debounce('bgOpacity', () => {
              this.removeLoadingCause('bgOpacity')
              this.setState({ lastEdited: Date.now() })
            }, 200)
          }}
          minValue={0}
          maxValue={100}
          stickToMarkers={false}
        >
          Background Opacity
        </SliderInput>
      </div>
    )
  }
}
