# leopard-cli

Leopard CLI is a tool for setting up your dev environment with one command so that you can get coding faster 🐆 ⚡💻

# install

npm i -g leopard-cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/leopard-cli.svg)](https://npmjs.org/package/leopard-cli)
[![Downloads/week](https://img.shields.io/npm/dw/leopard-cli.svg)](https://npmjs.org/package/leopard-cli)
[![License](https://img.shields.io/npm/l/leopard-cli.svg)](https://github.com/NeverEnder4/leopard-cli/blob/master/package.json)

- [Usage](#usage)
- [Commands](#commands)

# Usage

```sh-session
$ npm install -g leopard-cli
$ leopard COMMAND
$ leopard (-v|--version|version)
leopard-cli/0.0.0 win32-x64 node-v10.6.0
$ leopard --help [COMMAND]
USAGE
  $ leopard COMMAND
...
```

# Commands

- [`leopard next project-name`](#leopard-next)
- [`leopard help [COMMAND]`](#leopard-help-command)

## `leopard next`

Set up a NextJS project with custom settings. Creates all necessary directories and files to facilitate any options specified via command flags.

```
USAGE
  $ leopard next project-name

OPTIONS
  -s, --server
  Preload and server your project from a custom express server.

  -c, --css=stylus
  Preload your project with sass, less or stylus.

  -g, --googleFont=Roboto:200,400,800+Poppins:400,800
  Create a custom _app.js page with Google fonts preloaded at specified weights using a  link tag.

  -n, --normalize
  Create a custom _app.js page and setup CSS modules to facilitate normalize.css import on _app.js page.

  -m, -modules
  Set up CSS modules in a next.config.js file.
```

_See code: [src\commands\next.js](https://github.com/NeverEnder4/leopard-cli/blob/v0.0.0/src\commands\next.js)_

## `leopard help [COMMAND]`

display help for leopard

```
USAGE
  $ leopard help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_
