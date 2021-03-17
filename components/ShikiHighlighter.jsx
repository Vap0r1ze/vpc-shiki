const { React, i18n: { Messages } } = require('powercord/webpack')
const { clipboard } = require('electron')

module.exports = class ShikiHighlighter extends React.PureComponent {
  state = {
    copyCooldown: false
  }

  text2DOM (text) {
    const template = document.createElement('template')
    template.innerHTML = text
    return template.content.firstChild
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
    } = this.props

    const highlighter = getHighlighter()

    let tokens
    try {
      tokens = highlighter.codeToThemedTokens(content, lang)
    } catch (error) {
      tokens = highlighter.codeToThemedTokens(content)
    }

    const langName = getLangName(lang)
    const theme = highlighter.getTheme()._theme
    const plainColor = theme.fg
    const accentBgColor = theme.colors['statusBar.background'] || '#007BC8'
    const accentFgColor = theme.colors['statusBar.foreground'] || '#FFF'
    const backgroundColor = theme.colors['editor.background'] || 'var(--background-secondary)'

    const codeTableRows = tokens.map((line, i) => (
      <tr>
        <td style={{ color: plainColor }}>{i + 1}</td>
        <td>
          {line.map(({ content, color }) => (
            <span style={{ color }}>{content}</span>
          ))}
        </td>
      </tr>
    ))

    let preClassName = 'vpc-shiki'
    if (!langName) preClassName += ' vpc-shiki-plain'
    if (isPreview) preClassName += ' vpc-shiki-preview'

    return (
      <pre className={preClassName} style={{ backgroundColor }}>
        <code>
          {langName && <div className="vpc-shiki-lang" style={{ color: plainColor }}>{langName}</div>}
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
