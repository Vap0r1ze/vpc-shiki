const { React, hljs, i18n: { Messages } } = require('powercord/webpack')
const { clipboard } = require('electron')

module.exports = class ShikiHighlighter extends React.PureComponent {
  state = {
    copyCooldown: false
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

  render () {
    const {
      lang,
      content,
      getHighlighter,
      getLangName,
      isPreview,
      tryHLJS,
    } = this.props

    const hljsLang = hljs?.getLanguage?.(lang)
    let langName = getLangName(lang)

    let useHLJS
    switch (tryHLJS) {
      case 'always':
        useHLJS = true
        break
      case 'primary':
        useHLJS = !!hljsLang || lang === ''
        break
      case 'secondary':
        useHLJS = !langName && !!hljsLang
        break
      case 'never':
        useHLJS = false
        break
    }

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
      } catch (error) {
        lines = content.split('\n').map(line => <span>{line}</span>)
      }
    } else {
      let tokens

      try {
        tokens = highlighter.codeToThemedTokens(content, lang || 'NOT_A_REAL_LANG')
        console.log(tokens)
      } catch (error) {
        tokens = content.split('\n').map(line => ([{ color: plainColor, content: line }]))
      }

      lines = tokens.map(line => line.map(({ content, color, style }) => (
        <span style={{
          color,
          fontStyle: style === 'italic' && style,
          fontWeight: style === 'bold' && style,
        }}>{content}</span>
      )))
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
      <pre className={preClassName} style={{ backgroundColor, color: plainColor }}>
        <code>
          {langName && <div className="vpc-shiki-lang">{langName}</div>}
          <table className="vpc-shiki-table">
            {...codeTableRows}
          </table>
          <button className="vpc-shiki-copy-btn" onClick={this.onCopyBtnClick.bind(this)} style={{
            backgroundColor: accentBgColor,
            color: accentFgColor,
            cursor: this.state.copyCooldown ? 'default' : null
          }}>{this.state.copyCooldown ? Messages.ACCOUNT_USERNAME_COPY_SUCCESS_1 : Messages.COPY}</button>
          {this.props.children}
        </code>
      </pre>
    )
  }
}
