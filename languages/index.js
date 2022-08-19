const fs = require('fs').promises
const { resolve } = require('path')

module.exports = [
  {
    name: 'ABAP',
    id: 'abap',
    scopeName: 'source.abap',
    grammarFile: 'abap.tmLanguage.json'
  },
  {
    name: 'ActionScript',
    id: 'actionscript-3',
    scopeName: 'source.actionscript.3',
    grammarFile: 'actionscript-3.tmLanguage.json',
    aliases: ['as', 'actionscript']
  },
  {
    name: 'Ada',
    id: 'ada',
    scopeName: 'source.ada',
    grammarFile: 'ada.tmLanguage.json'
  },
  {
    name: 'Apex',
    id: 'apex',
    scopeName: 'source.apex',
    grammarFile: 'apex.tmLanguage.json'
  },
  {
    name: 'AppleScript',
    id: 'applescript',
    scopeName: 'source.applescript',
    grammarFile: 'applescript.tmLanguage.json'
  },
  {
    name: 'AsciiDoc',
    id: 'asciidoc',
    scopeName: 'text.asciidoc',
    grammarFile: 'asciidoc.tmLanguage.json'
  },
  {
    name: 'Assembly x64',
    id: 'asm',
    scopeName: 'source.asm.x86_64',
    grammarFile: 'asm.tmLanguage.json'
  },
  {
    name: 'ASP.NET Razor',
    id: 'asp-net-razor',
    devicon: 'dot-net-plain',
    scopeName: 'text.aspnetcorerazor',
    grammarFile: 'asp-net-razor.tmLanguage.json',
    aliases: ['razor']
  },
  {
    name: 'AWK',
    id: 'awk',
    scopeName: 'source.awk',
    grammarFile: 'awk.tmLanguage.json'
  },
  {
    name: 'Batchfile',
    id: 'bat',
    scopeName: 'source.batchfile',
    grammarFile: 'bat.tmLanguage.json',
    aliases: ['batch']
  },
  {
    name: 'C',
    id: 'c',
    devicon: 'c-plain',
    scopeName: 'source.c',
    grammarFile: 'c.tmLanguage.json'
  },
  {
    name: 'Clojure',
    id: 'clojure',
    devicon: 'clojure-line',
    scopeName: 'source.clojure',
    grammarFile: 'clojure.tmLanguage.json',
    aliases: ['clj']
  },
  {
    name: 'Cobol',
    id: 'cobol',
    scopeName: 'source.cobol',
    grammarFile: 'cobol.tmLanguage.json'
  },
  {
    name: 'CoffeeScript',
    id: 'coffee',
    devicon: 'coffeescript-original',
    scopeName: 'source.coffee',
    grammarFile: 'coffee.tmLanguage.json'
  },
  {
    name: 'C++ Embedded Macro',
    id: 'cpp.embedded.macro',
    devicon: 'cplusplus-plain',
    scopeName: 'source.cpp.embedded.macro',
    grammarFile: 'cpp.embedded.macro.tmLanguage.json'
  },
  {
    name: 'C++',
    id: 'cpp',
    devicon: 'cplusplus-plain',
    scopeName: 'source.cpp',
    grammarFile: 'cpp.tmLanguage.json'
  },
  {
    name: 'Crystal',
    id: 'crystal',
    scopeName: 'source.crystal',
    grammarFile: 'crystal.tmLanguage.json'
  },
  {
    name: 'C#',
    id: 'csharp',
    devicon: 'csharp-plain',
    scopeName: 'source.cs',
    grammarFile: 'csharp.tmLanguage.json',
    aliases: ['c#', 'cs']
  },
  {
    name: 'CSS',
    id: 'css',
    devicon: 'css3-plain',
    scopeName: 'source.css',
    grammarFile: 'css.tmLanguage.json'
  },
  {
    name: 'D',
    id: 'd',
    scopeName: 'source.d',
    grammarFile: 'd.tmLanguage.json'
  },
  {
    name: 'Dart',
    id: 'dart',
    scopeName: 'source.dart',
    grammarFile: 'dart.tmLanguage.json'
  },
  {
    name: 'Diff',
    id: 'diff',
    scopeName: 'source.diff',
    grammarFile: 'diff.tmLanguage.json'
  },
  {
    name: 'Dockerfile',
    id: 'dockerfile',
    devicon: 'docker-plain',
    scopeName: 'source.dockerfile',
    grammarFile: 'dockerfile.tmLanguage.json'
  },
  {
    name: 'Elixir',
    id: 'elixir',
    devicon: 'elixir-plain',
    scopeName: 'source.elixir',
    grammarFile: 'elixir.tmLanguage.json'
  },
  {
    name: 'Elm',
    id: 'elm',
    devicon: 'elm-plain',
    scopeName: 'source.elm',
    grammarFile: 'elm.tmLanguage.json'
  },
  {
    name: 'Erlang',
    id: 'erlang',
    devicon: 'erlang-plain',
    scopeName: 'source.erlang',
    grammarFile: 'erlang.tmLanguage.json'
  },
  {
    name: 'F#',
    id: 'fsharp',
    devicon: 'fsharp-plain',
    scopeName: 'source.fsharp',
    grammarFile: 'fsharp.tmLanguage.json',
    aliases: ['f#']
  },
  {
    name: 'Git Commit',
    id: 'git-commit',
    scopeName: 'text.git-commit',
    grammarFile: 'git-commit.tmLanguage.json'
  },
  {
    name: 'Git Rebase',
    id: 'git-rebase',
    scopeName: 'text.git-rebase',
    grammarFile: 'git-rebase.tmLanguage.json'
  },
  {
    name: 'GNU Plot',
    id: 'gnuplot',
    scopeName: 'source.gnuplot',
    grammarFile: 'gnuplot.tmLanguage.json'
  },
  {
    name: 'GDScript',
    id: 'gdscript',
    scopeName: 'source.gdscript',
    grammarFile: 'GDScript.tmLanguage.json',
    aliases: ['godot', 'gds', 'gd']
  },
  {
    name: 'Go',
    id: 'go',
    devicon: 'go-plain',
    scopeName: 'source.go',
    grammarFile: 'go.tmLanguage.json'
  },
  {
    name: 'GraphQL',
    id: 'graphql',
    scopeName: 'source.graphql',
    grammarFile: 'graphql.tmLanguage.json'
  },
  {
    name: 'Groovy',
    id: 'groovy',
    icon: 'groovy-plain',
    scopeName: 'source.groovy',
    grammarFile: 'groovy.tmLanguage.json'
  },
  {
    name: 'Hack',
    id: 'hack',
    scopeName: 'source.hack',
    grammarFile: 'hack.tmLanguage.json'
  },
  {
    name: 'Haml',
    id: 'haml',
    scopeName: 'text.haml',
    grammarFile: 'haml.tmLanguage.json'
  },
  {
    name: 'Handlebars',
    id: 'handlebars',
    devicon: 'handlebars-plain',
    scopeName: 'text.html.handlebars',
    grammarFile: 'handlebars.tmLanguage.json',
    aliases: ['hbs']
  },
  {
    name: 'Haskell',
    id: 'haskell',
    devicon: 'haskell-plain',
    scopeName: 'source.haskell',
    grammarFile: 'haskell.tmLanguage.json',
    aliases: ['hs']
  },
  {
    name: 'HCL',
    id: 'hcl',
    scopeName: 'source.hcl',
    grammarFile: 'hcl.tmLanguage.json'
  },
  {
    name: 'High-Level Shading Language',
    id: 'hlsl',
    scopeName: 'source.hlsl',
    grammarFile: 'hlsl.tmLanguage.json'
  },
  {
    name: 'eRuby',
    id: 'html-ruby-erb',
    scopeName: 'text.html.erb',
    grammarFile: 'html-ruby-erb.tmLanguage.json',
    aliases: ['erb']
  },
  {
    name: 'HTML',
    id: 'html',
    icon: 'html5-plain',
    scopeName: 'text.html.basic',
    grammarFile: 'html.tmLanguage.json'
  },
  {
    name: 'HTTP',
    id: 'http',
    scopeName: 'source.http',
    grammarFile: 'http.tmLanguage.json',
    aliases: ['rest']
  },
  {
    name: 'INI',
    id: 'ini',
    scopeName: 'source.ini',
    grammarFile: 'ini.tmLanguage.json'
  },
  {
    name: 'Java',
    id: 'java',
    devicon: 'java-plain',
    scopeName: 'source.java',
    grammarFile: 'java.tmLanguage.json'
  },
  {
    name: 'JavaScript',
    id: 'javascript',
    devicon: 'javascript-plain',
    scopeName: 'source.js',
    grammarFile: 'javascript.tmLanguage.json',
    aliases: ['js', 'esm', 'cjs']
  },
  {
    name: 'Jinja Template',
    id: 'jinja-html',
    scopeName: 'text.html.jinja',
    grammarFile: 'jinja-html.tmLanguage.json',
    aliases: ['jhtml']
  },
  {
    name: 'Jinja',
    id: 'jinja',
    scopeName: 'source.jinja',
    grammarFile: 'jinja.tmLanguage.json',
    aliases: ['j2']
  },
  {
    name: 'JSON',
    id: 'json',
    scopeName: 'source.json',
    grammarFile: 'json.tmLanguage.json'
  },
  {
    name: 'JSON5',
    id: 'json5',
    scopeName: 'source.json5',
    grammarFile: 'json5.tmLanguage.json'
  },
  {
    name: 'JSON-C',
    id: 'jsonc',
    scopeName: 'source.json.comments',
    grammarFile: 'jsonc.tmLanguage.json'
  },
  {
    name: 'Jsonnet',
    id: 'jsonnet',
    scopeName: 'source.jsonnet',
    grammarFile: 'jsonnet.tmLanguage.json'
  },
  {
    name: 'JSX',
    id: 'jsx',
    devicon: 'react-original',
    scopeName: 'source.js',
    grammarFile: 'javascript.tmLanguage.json'
  },
  {
    name: 'Julia',
    id: 'julia',
    scopeName: 'source.julia',
    grammarFile: 'julia.tmLanguage.json',
    aliases: ['jl']
  },
  {
    name: 'Kotlin',
    id: 'kotlin',
    devicon: 'kotlin-plain',
    scopeName: 'source.kotlin',
    grammarFile: 'kotlin.tmLanguage.json',
    aliases: ['kt', 'kts']
  },
  {
    name: 'LaTeX',
    id: 'latex',
    scopeName: 'text.tex.latex',
    grammarFile: 'latex.tmLanguage.json',
    aliases: ['tex']
  },
  {
    name: 'Less',
    id: 'less',
    devicon: 'less-plain-wordmark',
    scopeName: 'source.css.less',
    grammarFile: 'less.tmLanguage.json'
  },
  {
    name: 'Lisp',
    id: 'lisp',
    scopeName: 'source.lisp',
    grammarFile: 'lisp.tmLanguage.json'
  },
  {
    name: 'Logo',
    id: 'logo',
    scopeName: 'source.logo',
    grammarFile: 'logo.tmLanguage.json'
  },
  {
    name: 'Lua',
    id: 'lua',
    scopeName: 'source.lua',
    grammarFile: 'lua.tmLanguage.json'
  },
  {
    name: 'Luau',
    id: 'luau',
    scopeName: 'source.luau',
    grammarFile: 'luau.tmLanguage.json'
  },
  {
    name: 'Makefile',
    id: 'makefile',
    scopeName: 'source.makefile',
    grammarFile: 'makefile.tmLanguage.json'
  },
  {
    name: 'Markdown',
    id: 'markdown',
    scopeName: 'text.html.markdown',
    grammarFile: 'markdown.tmLanguage.json',
    aliases: ['md']
  },
  {
    name: 'MATLAB',
    id: 'matlab',
    devicon: 'matlab-plain',
    scopeName: 'source.matlab',
    grammarFile: 'matlab.tmLanguage.json'
  },
  {
    name: 'MC Function',
    id: 'mcfunction',
    scopeName: 'source.mcfunction',
    grammarFile: 'mcfunction.tmLanguage.json'
  },
  {
    name: 'Multidimensional Expression',
    id: 'mdx',
    scopeName: 'text.html.markdown.jsx',
    grammarFile: 'mdx.tmLanguage.json'
  },
  {
    name: 'MoonScript',
    id: 'moonscript',
    scopeName: 'source.moonscript',
    grammarFile: 'moonscript.tmLanguage.json',
    aliases: ['moon']
  },
  {
    name: 'Nim',
    id: 'nim',
    scopeName: 'source.nim',
    grammarFile: 'nim.tmLanguage.json'
  },
  {
    name: 'Nimble',
    id: 'nimble',
    scopeName: 'source.nimble',
    grammarFile: 'nimble.tmLanguage.json'
  },
  {
    name: 'Nix',
    id: 'nix',
    scopeName: 'source.nix',
    grammarFile: 'nix.tmLanguage.json'
  },
  {
    name: 'Objective C',
    id: 'objective-c',
    devicon: 'objectivec-plain',
    scopeName: 'source.objcpp',
    grammarFile: 'objective-c.tmLanguage.json',
    aliases: ['objc']
  },
  {
    name: 'OCaml',
    id: 'ocaml',
    devicon: 'ocaml-plain',
    scopeName: 'source.ocaml',
    grammarFile: 'ocaml.tmLanguage.json'
  },
  {
    name: 'Pascal',
    id: 'pascal',
    scopeName: 'source.pascal',
    grammarFile: 'pascal.tmLanguage.json',
    aliases: ['pas']
  },
  {
    name: 'PEG.js',
    id: 'pegjs',
    scopeName: 'source.pegjs',
    grammarFile: 'pegjs.tmLanguage.json'
  },
  {
    name: 'Perl',
    id: 'perl',
    scopeName: 'source.perl',
    grammarFile: 'perl.tmLanguage.json'
  },
  {
    name: 'Raku',
    id: 'perl6',
    scopeName: 'source.perl.6',
    grammarFile: 'perl6.tmLanguage.json',
    aliases: ['raku', 'p6']
  },
  {
    name: 'PHP Template',
    id: 'php-html',
    devicon: 'php-plain',
    scopeName: 'text.html.php',
    grammarFile: 'php-html.tmLanguage.json',
    aliases: ['phtml']
  },
  {
    name: 'PHP',
    id: 'php',
    devicon: 'php-plain',
    scopeName: 'source.php',
    grammarFile: 'php.tmLanguage.json'
  },
  {
    name: 'PL/SQL',
    id: 'pls',
    scopeName: 'source.plsql.oracle',
    grammarFile: 'pls.tmLanguage.json'
  },
  {
    name: 'PostCSS',
    id: 'postcss',
    scopeName: 'source.css.postcss',
    grammarFile: 'postcss.tmLanguage.json'
  },
  {
    name: 'PowerShell',
    id: 'powershell',
    scopeName: 'source.powershell',
    grammarFile: 'powershell.tmLanguage.json',
    aliases: ['ps', 'ps1']
  },
  {
    name: 'Prolog',
    id: 'prolog',
    scopeName: 'source.prolog',
    grammarFile: 'prolog.tmLanguage.json'
  },
  {
    name: 'Protocol Buffer 3',
    id: 'proto',
    scopeName: 'source.proto',
    grammarFile: 'proto3.tmLanguage.json'
  },
  {
    name: 'Pug',
    id: 'pug',
    scopeName: 'text.pug',
    grammarFile: 'pug.tmLanguage.json',
    aliases: ['jade']
  },
  {
    name: 'Puppet',
    id: 'puppet',
    scopeName: 'source.puppet',
    grammarFile: 'puppet.tmLanguage.json'
  },
  {
    name: 'PureScript',
    id: 'purescript',
    scopeName: 'source.purescript',
    grammarFile: 'purescript.tmLanguage.json',
    aliases: ['purs']
  },
  {
    name: 'Python',
    id: 'python',
    devicon: 'python-plain',
    scopeName: 'source.python',
    grammarFile: 'python.tmLanguage.json',
    aliases: ['py']
  },
  {
    name: 'R',
    id: 'r',
    devicon: 'r-original',
    scopeName: 'source.r',
    grammarFile: 'r.tmLanguage.json'
  },
  {
    name: 'ASP.NET Razor',
    id: 'razor',
    devicon: 'dot-net-plain',
    scopeName: 'text.html.cshtml',
    grammarFile: 'razor.tmLanguage.json',
    aliases: ['cshtml']
  },
  {
    name: 'Ruby',
    id: 'ruby',
    devicon: 'ruby-plain',
    scopeName: 'source.ruby',
    grammarFile: 'ruby.tmLanguage.json',
    aliases: ['rb']
  },
  {
    name: 'Rust',
    id: 'rust',
    devicon: 'rust-plain',
    scopeName: 'source.rust',
    grammarFile: 'rust.tmLanguage.json',
    aliases: ['rs']
  },
  {
    name: 'SAS',
    id: 'sas',
    scopeName: 'source.sas',
    grammarFile: 'sas.tmLanguage.json'
  },
  {
    name: 'Sass',
    id: 'sass',
    devicon: 'sass-original',
    scopeName: 'source.sass',
    grammarFile: 'sass.tmLanguage.json'
  },
  {
    name: 'Scala',
    id: 'scala',
    devicon: 'scala-plain',
    scopeName: 'source.scala',
    grammarFile: 'scala.tmLanguage.json'
  },
  {
    name: 'Scheme',
    id: 'scheme',
    scopeName: 'source.scheme',
    grammarFile: 'scheme.tmLanguage.json'
  },
  {
    name: 'SCSS',
    id: 'scss',
    devicon: 'sass-original',
    scopeName: 'source.css.scss',
    grammarFile: 'scss.tmLanguage.json'
  },
  {
    name: 'ShaderLab',
    id: 'shaderlab',
    scopeName: 'source.shaderlab',
    grammarFile: 'shaderlab.tmLanguage.json',
    aliases: ['shader']
  },
  {
    name: 'Shell',
    id: 'shellscript',
    devicon: 'bash-plain',
    scopeName: 'source.shell',
    grammarFile: 'shellscript.tmLanguage.json',
    aliases: ['shell', 'bash', 'sh', 'zsh']
  },
  {
    name: 'Smalltalk',
    id: 'smalltalk',
    scopeName: 'source.smalltalk',
    grammarFile: 'smalltalk.tmLanguage.json'
  },
  {
    name: 'SourcePawn',
    id: 'sp',
    scopeName: 'source.sourcepawn',
    grammarFile: 'sourcepawn.tmLanguage.json'
  },
  {
    name: 'SQL',
    id: 'sql',
    scopeName: 'source.sql',
    grammarFile: 'sql.tmLanguage.json'
  },
  {
    name: 'SSH Config',
    id: 'ssh-config',
    scopeName: 'source.ssh-config',
    grammarFile: 'ssh-config.tmLanguage.json'
  },
  {
    name: 'Stylus',
    id: 'stylus',
    devicon: 'stylus-original',
    scopeName: 'source.stylus',
    grammarFile: 'stylus.tmLanguage.json',
    aliases: ['styl']
  },
  {
    name: 'Swift',
    id: 'swift',
    devicon: 'swift-plain',
    scopeName: 'source.swift',
    grammarFile: 'swift.tmLanguage.json'
  },
  {
    name: 'Tcl',
    id: 'tcl',
    scopeName: 'source.tcl',
    grammarFile: 'tcl.tmLanguage.json'
  },
  {
    name: 'TOML',
    id: 'toml',
    scopeName: 'source.toml',
    grammarFile: 'toml.tmLanguage.json'
  },
  {
    name: 'TypeScript Doc',
    id: 'ts-doc',
    devicon: 'typescript-plain',
    scopeName: 'documentation.injection.ts',
    grammarFile: 'ts.tmLanguage.json'
  },
  {
    name: 'TSX',
    id: 'tsx',
    devicon: 'react-original',
    scopeName: 'source.tsx',
    grammarFile: 'tsx.tmLanguage.json'
  },
  {
    name: 'TypeScript',
    id: 'typescript',
    devicon: 'typescript-plain',
    scopeName: 'source.ts',
    grammarFile: 'typescript.tmLanguage.json',
    aliases: ['ts']
  },
  {
    name: 'VHDL',
    id: 'vhdl',
    scopeName: 'source.vhdl',
    grammarFile: 'vhdl.tmLanguage.json'
  },
  {
    name: 'Visual Basic .NET',
    id: 'vb',
    devicon: 'dot-net-plain',
    scopeName: 'source.asp.vb.net',
    grammarFile: 'vb.tmLanguage.json',
    aliases: ['cmd']
  },
  {
    name: 'VimL',
    id: 'viml',
    devicon: 'vim-plain',
    scopeName: 'source.viml',
    grammarFile: 'viml.tmLanguage.json',
    aliases: ['vim']
  },
  {
    name: 'Vue HTML',
    id: 'vue-html',
    devicon: 'vuejs-plain',
    scopeName: 'text.html.vue-html',
    grammarFile: 'vue-html.tmLanguage.json'
  },
  {
    name: 'Vue',
    id: 'vue',
    devicon: 'vuejs-plain',
    scopeName: 'source.vue',
    grammarFile: 'vue.tmLanguage.json'
  },
  {
    name: 'WebAssembly',
    id: 'wasm',
    scopeName: 'source.wat',
    grammarFile: 'wasm.tmLanguage.json',
    aliases: ['wat']
  },
  {
    name: 'XML',
    id: 'xml',
    scopeName: 'text.xml',
    grammarFile: 'xml.tmLanguage.json'
  },
  {
    name: 'XSL',
    id: 'xsl',
    scopeName: 'text.xml.xsl',
    grammarFile: 'xsl.tmLanguage.json'
  },
  {
    name: 'YAML',
    id: 'yaml',
    scopeName: 'source.yaml',
    grammarFile: 'yaml.tmLanguage.json',
    aliases: ['yml']
  },
  {
    name: 'Wenyan',
    id: '文言',
    scopeName: 'source.wenyan',
    grammarFile: '文言.tmLanguage.json',
    aliases: ['wenyan']
  }
]

module.exports.loadGrammar = id => {
  const lang = module.exports.find(l => l.id === id)
  if (!lang) throw new Error(`Could not find load grammar of invalid lang "${id}"`)
  if (lang.grammar) return Promise.resolve(lang.grammar)
  return fs.readFile(resolve(__dirname, lang.grammarFile), 'utf-8')
    .then(json => lang.grammar = JSON.parse(json))
}
