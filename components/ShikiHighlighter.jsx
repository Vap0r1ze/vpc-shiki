const { React, i18n: { Messages } } = require('powercord/webpack')
const { clipboard } = require('electron')

module.exports = class ShikiHighlighter extends React.PureComponent {
  text2DOM (text) {
    const template = document.createElement('template')
    template.innerHTML = text
    return template.content.firstChild
  }

  onCopyBtnClick (e) {
    // const { target } = e
    // if (target.classList.contains('copied')) {
    //   return
    // }

    // target.innerText = Messages.ACCOUNT_USERNAME_COPY_SUCCESS_1
    // target.classList.add('copied')

    // setTimeout(() => {
    //   target.innerText = Messages.COPY
    //   target.classList.remove('copied')
    // }, 1e3)

    clipboard.writeText(content)
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

    let html
    try {
      html = highlighter.codeToHtml(content, lang)
    } catch (error) {
      html = highlighter.codeToHtml(content)
    }

    const pre = this.text2DOM(html)
    const langName = getLangName(lang)
    const [, plainColor] = highlighter.codeToHtml('').match(/[" ;]color: ?(#[a-fA-F0-9]+)/)

    const lineSpans = [...pre.firstChild.children]
    let lines
    if (langName || lineSpans.length !== 1) {
      lines = lineSpans.map(line => line.innerHTML)
    } else {
      lines = lineSpans[0].firstChild.innerHTML.split('\n').map(line => `<span style="color: ${plainColor}">${line}</span>`)
    }

    const codeTableRows = lines.map((line, i) => (
      <tr>
        <td style={{ color: plainColor }}>{i + 1}</td>
        <td dangerouslySetInnerHTML={{ __html: line }}></td>
      </tr>
    ))

    let preClassName = 'vpc-shiki'
    if (!langName) preClassName += ' vpc-shiki-plain'
    if (isPreview) preClassName += ' vpc-shiki-preview'

    console.log(Messages)

    return (
      <pre className={preClassName} style={{ backgroundColor: pre.style.backgroundColor }}>
        <code>
          {langName && <div className="vpc-shiki-lang" style={{ color: plainColor }}>{langName}</div>}
          <table className="vpc-shiki-table">
            {...codeTableRows}
          </table>
          <button className="vpc-shiki-copy-btn" onClick={onCopyBtnClick}>{Messages.COPY}</button>
        </code>
      </pre>
    )
  }
}
