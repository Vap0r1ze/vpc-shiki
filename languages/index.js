const fs = require('fs')
const { resolve } = require('path')

function loadJSON (fileName) {
  return JSON.parse(fs.readFileSync(resolve(__dirname, fileName)))
}

module.exports = [
  {
    name: 'ABAP',
    id: 'abap',
    scopeName: 'source.abap',
    grammar: loadJSON('abap.tmLanguage.json')
  },
  {
    name: 'ActionScript',
    id: 'actionscript-3',
    scopeName: 'source.actionscript.3',
    grammar: loadJSON('actionscript-3.tmLanguage.json'),
    aliases: ['as', 'actionscript']
  },
  {
    name: 'Ada',
    id: 'ada',
    scopeName: 'source.ada',
    grammar: loadJSON('ada.tmLanguage.json')
  },
  {
    name: 'Apex',
    id: 'apex',
    scopeName: 'source.apex',
    grammar: loadJSON('apex.tmLanguage.json')
  },
  {
    name: 'AppleScript',
    id: 'applescript',
    scopeName: 'source.applescript',
    grammar: loadJSON('applescript.tmLanguage.json')
  },
  {
    name: 'Assembly x64',
    id: 'asm',
    scopeName: 'source.asm.x86_64',
    grammar: loadJSON('asm.tmLanguage.json')
  },
  {
    name: 'ASP.NET Razor',
    id: 'asp-net-razor',
    scopeName: 'text.aspnetcorerazor',
    grammar: loadJSON('asp-net-razor.tmLanguage.json'),
    aliases: ['razor']
  },
  {
    name: 'AWK',
    id: 'awk',
    scopeName: 'source.awk',
    grammar: loadJSON('awk.tmLanguage.json')
  },
  {
    name: 'Batchfile',
    id: 'bat',
    scopeName: 'source.batchfile',
    grammar: loadJSON('bat.tmLanguage.json'),
    aliases: ['batch']
  },
  {
    name: 'C',
    id: 'c',
    scopeName: 'source.c',
    grammar: loadJSON('c.tmLanguage.json')
  },
  {
    name: 'Clojure',
    id: 'clojure',
    scopeName: 'source.clojure',
    grammar: loadJSON('clojure.tmLanguage.json'),
    aliases: ['clj']
  },
  {
    name: 'Cobol',
    id: 'cobol',
    scopeName: 'source.cobol',
    grammar: loadJSON('cobol.tmLanguage.json')
  },
  {
    name: 'CoffeeScript',
    id: 'coffee',
    scopeName: 'source.coffee',
    grammar: loadJSON('coffee.tmLanguage.json')
  },
  {
    name: 'C++ Embedded Macro',
    id: 'cpp.embedded.macro',
    scopeName: 'source.cpp.embedded.macro',
    grammar: loadJSON('cpp.embedded.macro.tmLanguage.json')
  },
  {
    name: 'C++',
    id: 'cpp',
    scopeName: 'source.cpp',
    grammar: loadJSON('cpp.tmLanguage.json')
  },
  {
    name: 'Crystal',
    id: 'crystal',
    scopeName: 'source.crystal',
    grammar: loadJSON('crystal.tmLanguage.json')
  },
  {
    name: 'C#',
    id: 'csharp',
    scopeName: 'source.cs',
    grammar: loadJSON('csharp.tmLanguage.json'),
    aliases: ['c#']
  },
  {
    name: 'CSS',
    id: 'css',
    scopeName: 'source.css',
    grammar: loadJSON('css.tmLanguage.json')
  },
  {
    name: 'D',
    id: 'd',
    scopeName: 'source.d',
    grammar: loadJSON('d.tmLanguage.json')
  },
  {
    name: 'Dart',
    id: 'dart',
    scopeName: 'source.dart',
    grammar: loadJSON('dart.tmLanguage.json')
  },
  {
    name: 'Diff',
    id: 'diff',
    scopeName: 'source.diff',
    grammar: loadJSON('diff.tmLanguage.json')
  },
  {
    name: 'Dockerfile',
    id: 'dockerfile',
    scopeName: 'source.dockerfile',
    grammar: loadJSON('dockerfile.tmLanguage.json')
  },
  {
    name: 'Elixir',
    id: 'elixir',
    scopeName: 'source.elixir',
    grammar: loadJSON('elixir.tmLanguage.json')
  },
  {
    name: 'Elm',
    id: 'elm',
    scopeName: 'source.elm',
    grammar: loadJSON('elm.tmLanguage.json')
  },
  {
    name: 'Erlang',
    id: 'erlang',
    scopeName: 'source.erlang',
    grammar: loadJSON('erlang.tmLanguage.json')
  },
  {
    name: 'F#',
    id: 'fsharp',
    scopeName: 'source.fsharp',
    grammar: loadJSON('fsharp.tmLanguage.json'),
    aliases: ['f#']
  },
  {
    name: 'Git Commit',
    id: 'git-commit',
    scopeName: 'text.git-commit',
    grammar: loadJSON('git-commit.tmLanguage.json')
  },
  {
    name: 'Git Rebase',
    id: 'git-rebase',
    scopeName: 'text.git-rebase',
    grammar: loadJSON('git-rebase.tmLanguage.json')
  },
  {
    name: 'GNU Plot',
    id: 'gnuplot',
    scopeName: 'source.gnuplot',
    grammar: loadJSON('gnuplot.tmLanguage.json')
  },
  {
    name: 'Go',
    id: 'go',
    scopeName: 'source.go',
    grammar: loadJSON('go.tmLanguage.json')
  },
  {
    name: 'GraphQL',
    id: 'graphql',
    scopeName: 'source.graphql',
    grammar: loadJSON('graphql.tmLanguage.json')
  },
  {
    name: 'Groovy',
    id: 'groovy',
    scopeName: 'source.groovy',
    grammar: loadJSON('groovy.tmLanguage.json')
  },
  {
    name: 'Hack',
    id: 'hack',
    scopeName: 'source.hack',
    grammar: loadJSON('hack.tmLanguage.json')
  },
  {
    name: 'Haml',
    id: 'haml',
    scopeName: 'text.haml',
    grammar: loadJSON('haml.tmLanguage.json')
  },
  {
    name: 'Handlebars',
    id: 'handlebars',
    scopeName: 'text.html.handlebars',
    grammar: loadJSON('handlebars.tmLanguage.json'),
    aliases: ['hbs']
  },
  {
    name: 'Haskell',
    id: 'haskell',
    scopeName: 'source.haskell',
    grammar: loadJSON('haskell.tmLanguage.json'),
    aliases: ['hs']
  },
  {
    name: 'HCL',
    id: 'hcl',
    scopeName: 'source.hcl',
    grammar: loadJSON('hcl.tmLanguage.json')
  },
  {
    name: 'High-Level Shading Language',
    id: 'hlsl',
    scopeName: 'source.hlsl',
    grammar: loadJSON('hlsl.tmLanguage.json')
  },
  {
    name: 'eRuby',
    id: 'html-ruby-erb',
    scopeName: 'text.html.erb',
    grammar: loadJSON('html-ruby-erb.tmLanguage.json'),
    aliases: ['erb']
  },
  {
    name: 'HTML',
    id: 'html',
    scopeName: 'text.html.basic',
    grammar: loadJSON('html.tmLanguage.json')
  },
  {
    name: 'HTTP',
    id: 'http',
    scopeName: 'source.http',
    grammar: loadJSON('http.tmLanguage.json'),
    aliases: ['rest']
  },
  {
    name: 'INI',
    id: 'ini',
    scopeName: 'source.ini',
    grammar: loadJSON('ini.tmLanguage.json')
  },
  {
    name: 'Java',
    id: 'java',
    scopeName: 'source.java',
    grammar: loadJSON('java.tmLanguage.json')
  },
  {
    name: 'JavaScript',
    id: 'javascript',
    scopeName: 'source.js',
    grammar: loadJSON('javascript.tmLanguage.json'),
    aliases: ['js']
  },
  {
    name: 'Jinja Template',
    id: 'jinja-html',
    scopeName: 'text.html.jinja',
    grammar: loadJSON('jinja-html.tmLanguage.json'),
    aliases: ['jhtml']
  },
  {
    name: 'Jinja',
    id: 'jinja',
    scopeName: 'source.jinja',
    grammar: loadJSON('jinja.tmLanguage.json'),
    aliases: ['j2']
  },
  {
    name: 'JSON',
    id: 'json',
    scopeName: 'source.json',
    grammar: loadJSON('json.tmLanguage.json')
  },
  {
    name: 'JSON5',
    id: 'json5',
    scopeName: 'source.json5',
    grammar: loadJSON('json5.tmLanguage.json')
  },
  {
    name: 'JSON-C',
    id: 'jsonc',
    scopeName: 'source.json.comments',
    grammar: loadJSON('jsonc.tmLanguage.json')
  },
  {
    name: 'Jsonnet',
    id: 'jsonnet',
    scopeName: 'source.jsonnet',
    grammar: loadJSON('jsonnet.tmLanguage.json')
  },
  {
    name: 'JSX',
    id: 'jsx',
    scopeName: 'documentation.injection.js.jsx',
    grammar: loadJSON('jsx.tmLanguage.json')
  },
  {
    name: 'Julia',
    id: 'julia',
    scopeName: 'source.julia',
    grammar: loadJSON('julia.tmLanguage.json'),
    aliases: ['jl']
  },
  {
    name: 'Kotlin',
    id: 'kotlin',
    scopeName: 'source.kotlin',
    grammar: loadJSON('kotlin.tmLanguage.json'),
    aliases: ['kt', 'kts']
  },
  {
    name: 'LaTeX',
    id: 'latex',
    scopeName: 'text.tex.latex',
    grammar: loadJSON('latex.tmLanguage.json'),
    aliases: ['tex']
  },
  {
    name: 'Less',
    id: 'less',
    scopeName: 'source.css.less',
    grammar: loadJSON('less.tmLanguage.json')
  },
  {
    name: 'Lisp',
    id: 'lisp',
    scopeName: 'source.lisp',
    grammar: loadJSON('lisp.tmLanguage.json')
  },
  {
    name: 'Logo',
    id: 'logo',
    scopeName: 'source.logo',
    grammar: loadJSON('logo.tmLanguage.json')
  },
  {
    name: 'Lua',
    id: 'lua',
    scopeName: 'source.lua',
    grammar: loadJSON('lua.tmLanguage.json')
  },
  {
    name: 'Makefile',
    id: 'makefile',
    scopeName: 'source.makefile',
    grammar: loadJSON('makefile.tmLanguage.json')
  },
  {
    name: 'Markdown',
    id: 'markdown',
    scopeName: 'text.html.markdown',
    grammar: loadJSON('markdown.tmLanguage.json'),
    aliases: ['md']
  },
  {
    name: 'MATLAB',
    id: 'matlab',
    scopeName: 'source.matlab',
    grammar: loadJSON('matlab.tmLanguage.json')
  },
  {
    name: 'MC Function',
    id: 'mcfunction',
    scopeName: 'source.mcfunction',
    grammar: loadJSON('mcfunction.tmLanguage.json')
  },
  {
    name: 'Multidimensional Expression',
    id: 'mdx',
    scopeName: 'text.html.markdown.jsx',
    grammar: loadJSON('mdx.tmLanguage.json')
  },
  {
    name: 'MoonScript',
    id: 'moonscript',
    scopeName: 'source.moonscript',
    grammar: loadJSON('moonscript.tmLanguage.json'),
    aliases: ['moon']
  },
  {
    name: 'Nim',
    id: 'nim',
    scopeName: 'source.nim',
    grammar: loadJSON('nim.tmLanguage.json')
  },
  {
    name: 'Nimble',
    id: 'nimble',
    scopeName: 'source.nimble',
    grammar: loadJSON('nimble.tmLanguage.json')
  },
  {
    name: 'Nix',
    id: 'nix',
    scopeName: 'source.nix',
    grammar: loadJSON('nix.tmLanguage.json')
  },
  {
    name: 'Objective C',
    id: 'objective-c',
    scopeName: 'source.objcpp',
    grammar: loadJSON('objective-c.tmLanguage.json'),
    aliases: ['objc']
  },
  {
    name: 'OCaml',
    id: 'ocaml',
    scopeName: 'source.ocaml',
    grammar: loadJSON('ocaml.tmLanguage.json')
  },
  {
    name: 'Pascal',
    id: 'pascal',
    scopeName: 'source.pascal',
    grammar: loadJSON('pascal.tmLanguage.json'),
    aliases: ['pas']
  },
  {
    name: 'PEG.js',
    id: 'pegjs',
    scopeName: 'source.pegjs',
    grammar: loadJSON('pegjs.tmLanguage.json')
  },
  {
    name: 'Perl',
    id: 'perl',
    scopeName: 'source.perl',
    grammar: loadJSON('perl.tmLanguage.json')
  },
  {
    name: 'Raku',
    id: 'perl6',
    scopeName: 'source.perl.6',
    grammar: loadJSON('perl6.tmLanguage.json'),
    aliases: ['raku', 'p6']
  },
  {
    name: 'PHP Template',
    id: 'php-html',
    scopeName: 'text.html.php',
    grammar: loadJSON('php-html.tmLanguage.json'),
    aliases: ['phtml']
  },
  {
    name: 'PHP',
    id: 'php',
    scopeName: 'source.php',
    grammar: loadJSON('php.tmLanguage.json')
  },
  {
    name: 'PL/SQL',
    id: 'pls',
    scopeName: 'source.plsql.oracle',
    grammar: loadJSON('pls.tmLanguage.json')
  },
  {
    name: 'PostCSS',
    id: 'postcss',
    scopeName: 'source.css.postcss',
    grammar: loadJSON('postcss.tmLanguage.json')
  },
  {
    name: 'PowerShell',
    id: 'powershell',
    scopeName: 'source.powershell',
    grammar: loadJSON('powershell.tmLanguage.json'),
    aliases: ['ps', 'ps1']
  },
  {
    name: 'Prolog',
    id: 'prolog',
    scopeName: 'source.prolog',
    grammar: loadJSON('prolog.tmLanguage.json')
  },
  {
    name: 'Protocol Buffer 3',
    id: 'proto',
    scopeName: 'source.proto',
    grammar: loadJSON('proto3.tmLanguage.json')
  },
  {
    name: 'Pug',
    id: 'pug',
    scopeName: 'text.pug',
    grammar: loadJSON('pug.tmLanguage.json'),
    aliases: ['jade']
  },
  {
    name: 'Puppet',
    id: 'puppet',
    scopeName: 'source.puppet',
    grammar: loadJSON('puppet.tmLanguage.json')
  },
  {
    name: 'PureScript',
    id: 'purescript',
    scopeName: 'source.purescript',
    grammar: loadJSON('purescript.tmLanguage.json'),
    aliases: ['purs']
  },
  {
    name: 'Python',
    id: 'python',
    scopeName: 'source.python',
    grammar: loadJSON('python.tmLanguage.json'),
    aliases: ['py']
  },
  {
    name: 'R',
    id: 'r',
    scopeName: 'source.r',
    grammar: loadJSON('r.tmLanguage.json')
  },
  {
    name: 'ASP.NET Razor',
    id: 'razor',
    scopeName: 'text.html.cshtml',
    grammar: loadJSON('razor.tmLanguage.json'),
    aliases: ['cshtml']
  },
  {
    name: 'Ruby',
    id: 'ruby',
    scopeName: 'source.ruby',
    grammar: loadJSON('ruby.tmLanguage.json'),
    aliases: ['rb']
  },
  {
    name: 'Rust',
    id: 'rust',
    scopeName: 'source.rust',
    grammar: loadJSON('rust.tmLanguage.json')
  },
  {
    name: 'SAS',
    id: 'sas',
    scopeName: 'source.sas',
    grammar: loadJSON('sas.tmLanguage.json')
  },
  {
    name: 'Sass',
    id: 'sass',
    scopeName: 'source.sass',
    grammar: loadJSON('sass.tmLanguage.json')
  },
  {
    name: 'Scala',
    id: 'scala',
    scopeName: 'source.scala',
    grammar: loadJSON('scala.tmLanguage.json')
  },
  {
    name: 'Scheme',
    id: 'scheme',
    scopeName: 'source.scheme',
    grammar: loadJSON('scheme.tmLanguage.json')
  },
  {
    name: 'SCSS',
    id: 'scss',
    scopeName: 'source.css.scss',
    grammar: loadJSON('scss.tmLanguage.json')
  },
  {
    name: 'ShaderLab',
    id: 'shaderlab',
    scopeName: 'source.shaderlab',
    grammar: loadJSON('shaderlab.tmLanguage.json'),
    aliases: ['shader']
  },
  {
    name: 'Shell',
    id: 'shellscript',
    scopeName: 'source.shell',
    grammar: loadJSON('shellscript.tmLanguage.json'),
    aliases: ['shell', 'bash', 'sh', 'zsh']
  },
  {
    name: 'Smalltalk',
    id: 'smalltalk',
    scopeName: 'source.smalltalk',
    grammar: loadJSON('smalltalk.tmLanguage.json')
  },
  {
    name: 'SQL',
    id: 'sql',
    scopeName: 'source.sql',
    grammar: loadJSON('sql.tmLanguage.json')
  },
  {
    name: 'SSH Config',
    id: 'ssh-config',
    scopeName: 'source.ssh-config',
    grammar: loadJSON('ssh-config.tmLanguage.json')
  },
  {
    name: 'Stylus',
    id: 'stylus',
    scopeName: 'source.stylus',
    grammar: loadJSON('stylus.tmLanguage.json'),
    aliases: ['styl']
  },
  {
    name: 'Swift',
    id: 'swift',
    scopeName: 'source.swift',
    grammar: loadJSON('swift.tmLanguage.json')
  },
  {
    name: 'Tcl',
    id: 'tcl',
    scopeName: 'source.tcl',
    grammar: loadJSON('tcl.tmLanguage.json')
  },
  {
    name: 'TOML',
    id: 'toml',
    scopeName: 'source.toml',
    grammar: loadJSON('toml.tmLanguage.json')
  },
  {
    name: 'TypeScript Doc',
    id: 'ts-doc',
    scopeName: 'documentation.injection.ts',
    grammar: loadJSON('ts.tmLanguage.json')
  },
  {
    name: 'TSX',
    id: 'tsx',
    scopeName: 'source.tsx',
    grammar: loadJSON('tsx.tmLanguage.json')
  },
  {
    name: 'TypeScript',
    id: 'typescript',
    scopeName: 'source.ts',
    grammar: loadJSON('typescript.tmLanguage.json'),
    aliases: ['ts']
  },
  {
    name: 'Visual Basic .NET',
    id: 'vb',
    scopeName: 'source.asp.vb.net',
    grammar: loadJSON('vb.tmLanguage.json'),
    aliases: ['cmd']
  },
  {
    name: 'VimL',
    id: 'viml',
    scopeName: 'source.viml',
    grammar: loadJSON('viml.tmLanguage.json'),
    aliases: ['vim']
  },
  {
    name: 'Vue HTML',
    id: 'vue-html',
    scopeName: 'text.html.vue-html',
    grammar: loadJSON('vue-html.tmLanguage.json')
  },
  {
    name: 'Vue',
    id: 'vue',
    scopeName: 'source.vue',
    grammar: loadJSON('vue.tmLanguage.json')
  },
  {
    name: 'WebAssembly',
    id: 'wasm',
    scopeName: 'source.wat',
    grammar: loadJSON('wasm.tmLanguage.json'),
    aliases: ['wat']
  },
  {
    name: 'XML',
    id: 'xml',
    scopeName: 'text.xml',
    grammar: loadJSON('xml.tmLanguage.json')
  },
  {
    name: 'XSL',
    id: 'xsl',
    scopeName: 'text.xml.xsl',
    grammar: loadJSON('xsl.tmLanguage.json')
  },
  {
    name: 'YAML',
    id: 'yaml',
    scopeName: 'source.yaml',
    grammar: loadJSON('yaml.tmLanguage.json'),
    aliases: ['yml']
  },
  {
    name: 'Wenyan',
    id: '文言',
    scopeName: 'source.wenyan',
    grammar: loadJSON('文言.tmLanguage.json'),
    aliases: ['wenyan']
  }
]
