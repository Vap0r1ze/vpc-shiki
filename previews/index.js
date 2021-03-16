const fs = require('fs')
const { resolve } = require('path')

const dummyFiles = fs.readdirSync(__dirname)
  .filter(file => file.startsWith('dummy'))

module.exports = dummyFiles.map(file => ({
  lang: file.replace('dummy.', ''),
  content: fs.readFileSync(resolve(__dirname, file), 'utf-8').toString().trim(),
}))
