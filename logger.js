const css = (strs, ...cssVars) => {
  const segs = strs.slice()
  for (let i = 0; i < cssVars.length; i++) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(cssVars[i])
    segs.splice(i + 1, 0, value)
  }
  return segs.join('')
}

module.exports = {
  log
}
