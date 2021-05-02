const color2Rgba = require('../color2Rgba.min.js')
const { React, hljs, i18n: { Messages } } = require('powercord/webpack')
const { clipboard } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const tempFileDir = path.join(__dirname, '../tempFiles')
const getTempFilePath = fileName => path.join(tempFileDir, fileName)
const getVscodeUrl = filePath => {
  if (os.platform() === 'win32') return 'vscode://file/' + filePath
  return new URL(filePath, 'vscode://file/').href
}

module.exports = class ShikiHighlighter extends React.PureComponent {
  ref = React.createRef()
  state = {
    copyCooldown: false,
    vscodeCooldown: false,
    tokens: null
  }

  onCopyBtnClick () {
    if (this.state.copyCooldown) return

    this.setState({
      copyCooldown: true
    })

    setTimeout(() => {
      this.setState({
        copyCooldown: false
      })
    }, 1000)

    clipboard.writeText(this.props.content)
  }

  onVscodeBtnClick () {
    if (this.state.vscodeCooldown) return

    let postClickState = {
      vscodeCooldown: true
    }

    if (!fs.existsSync(tempFileDir)) fs.mkdirSync(tempFileDir)

    fs.readdirSync(tempFileDir).map(fileName => {
      try {
        fs.unlinkSync(path.join(tempFileDir, fileName))
      } catch {}
    })

    const tempFileName = this.props.lang
      ? 'tempFile.' + this.props.lang
      : 'tempFile'
    const tempFilePath = getTempFilePath(tempFileName)

    try {
      fs.writeFileSync(tempFilePath, this.props.content)
      window.open(getVscodeUrl(tempFilePath))
    } catch (error) {
      console.error(error)
      postClickState = {
        vscodeCooldown: false
      }
    }

    if (postClickState.vscodeCooldown) {
      this.setState(postClickState)
      setTimeout(() => {
        this.setState({
          vscodeCooldown: false
        })
      }, 1000)
    }
  }

  componentDidMount () {
    const { content, lang, getHighlighter } = this.props
    if (!lang || this.shouldUseHLJS()) return

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          try {
            const highlighter = getHighlighter()
            this.setState({ tokens: highlighter.codeToThemedTokens(content, lang) })
          } catch (e) {
            // Silently ignore
          }

          this.observer.disconnect()
        }
      }
    })

    this.observer.observe(this.ref.current)
  }

  componentWillUnmount () {
    this.observer?.disconnect()
  }

  render () {
    const {
      lang,
      content,
      getHighlighter,
      getLang,
      isPreview,
      useDevIcon,
      bgOpacity,
    } = this.props

    const hljsLang = hljs?.getLanguage?.(lang)
    const shikiLang = getLang(lang)
    let langName = shikiLang?.name

    const useHLJS = this.shouldUseHLJS()
    const highlighter = getHighlighter()

    const theme = useHLJS ? null : highlighter?.getTheme?.()?._theme
    const plainColor = theme?.fg || 'var(--text-normal)'
    const accentBgColor = theme?.colors?.['statusBar.background'] || (useHLJS ? '#7289da' : '#007BC8')
    const accentFgColor = theme?.colors?.['statusBar.foreground'] || '#FFF'
    const backgroundColor = theme?.colors?.['editor.background'] || 'var(--background-secondary)'

    let lines

    if (useHLJS) {
      langName = hljsLang?.name
      try {
        const { value: hljsHtml } = hljs.highlight(lang, content, true)
        lines = hljsHtml.split('\n').map(line => <span dangerouslySetInnerHTML={{ __html: line }}/>)
      } catch {
        lines = content.split('\n').map(line => <span>{line}</span>)
      }
    } else {
      let tokens = this.state.tokens
      if (!tokens) {
        tokens = content.split('\n').map(line => ([{ color: plainColor, content: line }]))
      }

      lines = tokens.map(line => {
        // [Cynthia] this makes it so when you highlight the codeblock
        // empty lines are also selected and copied when you Ctrl+C.
        if (line.length === 0) {
          return React.createElement('span', null, '\n')
        }

        return line.map(({ content, color, fontStyle }) => (
          <span style={{
            color,
            fontStyle: (fontStyle & 1) && 'italic',
            fontWeight: (fontStyle & 2) && 'bold',
            textDecoration: (fontStyle & 4) && 'underline',
          }}>{content}</span>
        ))
      })
    }

    const codeTableRows = lines.map((line, i) => (
      <tr>
        <td style={{ color: plainColor }}>{i + 1}</td>
        <td>{line}</td>
      </tr>
    ))

    let preClassName = 'vpc-shiki'
    if (!langName) preClassName += ' vpc-shiki-plain'
    if (isPreview) preClassName += ' vpc-shiki-preview'

    return (
      <pre ref={this.ref} className={preClassName} style={{
        backgroundColor: useHLJS
          ? backgroundColor
          : `rgba(${color2Rgba(backgroundColor).slice(0, 3).concat(bgOpacity / 100).join(', ')})`,
        color: plainColor,
      }}>
        <code>
          {langName && <div className="vpc-shiki-lang">
            {(useDevIcon !== 'false') && shikiLang?.devicon && <i className={`devicon-${shikiLang.devicon}${
              useDevIcon === 'colored' ? ' colored' : ''
            }`}/>}
            {langName}
          </div>}
          <table className="vpc-shiki-table">
            {...codeTableRows}
          </table>
          <div className="vpc-shiki-btns">
            <button className="vpc-shiki-btn" onClick={this.onVscodeBtnClick.bind(this)} style={{
              backgroundColor: accentBgColor,
              color: accentFgColor,
              cursor: this.state.vscodeCooldown ? 'default' : null
            }}>{this.state.vscodeCooldown ? 'Opened VSCode!' : 'VSCode'}</button>
            <button className="vpc-shiki-btn" onClick={this.onCopyBtnClick.bind(this)} style={{
              backgroundColor: accentBgColor,
              color: accentFgColor,
              cursor: this.state.copyCooldown ? 'default' : null
            }}>{this.state.copyCooldown ? Messages.ACCOUNT_USERNAME_COPY_SUCCESS_1 : Messages.COPY}</button>
          </div>
          {this.props.children}
        </code>
      </pre>
    )
  }

  shouldUseHLJS () {
    const { lang, getLang, tryHLJS } = this.props

    const hljsLang = hljs?.getLanguage?.(lang)
    const shikiLang = getLang(lang)
    const langName = shikiLang?.name

    switch (tryHLJS) {
      case 'always':
        return true
      case 'primary':
        return !!hljsLang || lang === ''
      case 'secondary':
        return !langName && !!hljsLang
      case 'never':
        return false
    }

    return false
  }
}
