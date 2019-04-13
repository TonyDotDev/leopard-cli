# leopard-cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/leopard-cli.svg)](https://npmjs.org/package/leopard-cli)
[![Downloads/week](https://img.shields.io/npm/dw/leopard-cli.svg)](https://npmjs.org/package/leopard-cli)
[![License](https://img.shields.io/npm/l/leopard-cli.svg)](https://github.com/NeverEnder4/leopard-cli/blob/master/package.json)

- [The Motivation](#🐆-the-motivation)
- [How Things Work](#💡-how-things-work)
- [Installation](#⚡-installation)
- [Commands](#💻-commands)
  - [leopard next](#leopard-next)
  - [leopard help](#leopard-help)
- [About Me](#👋-about-me)
- [License](#📜-license)

### 🐆 The Motivation

Setting up a NextJS project can be just cumbersome enough to distract you from the work at hand. Sometimes, during that process, things can go wrong and now you're stuck debugging an environment that you've set up many times before. What if you could set up a complex, ready to dev project with one command (and a few --flags)? Now you can!

### 💡 How Things Work

Underneath the hood, leopard-cli is built on [oclif](https://github.com/oclif/oclif) and uses [shelljs](https://github.com/shelljs/shelljs) for universal shell commands. When you issue the most basic command -- `leopard next project-name` -- a new project directory will be created with the following folder structure:

- project-name/
  - .next/
  - components/
  - pages/
    - index.js
  - package-lock.json
  - package.json

Adding flags to the basic command will change the folder structure to support the specified configuration. For example, if you run `leopard next project-name --css=stylus --server` the folder structure will now look like this:

- project-name/
  - .next/
  - components/
  - pages/
    - index.js
  - stylus/
    - index.styl
  - next.config.js
  - package-lock.json
  - package.json
  - server.js

### ⚡ Installation

Make sure to have NodeJS installed on your machine.

To check if Node is installed, run:
`--v node`

To install leopard-cli as a global command:
`npm i -g leopard-cli`

### 💻 Commands

###### `leopard next`

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

###### `leopard help`

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

### 👋 About Me

<!-- Contributors START
Tony Pettigrew
Contributors END -->
<!-- Contributors table START -->

| <img src="https://avatars.githubusercontent.com/neverender4?s=100" width="100" alt="Tony Pettigrew" /><br />[<sub>Tony Pettigrew</sub>](https://www.linkedin.com/in/tony-pettigrew-6b659455/)<br /> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- Contributors table END -->

My journey into coding started about 1.5 years ago when I needed a website to showcase music that I had been producing. I wasn't satisfied with Wix or Squarespace at the time and decided that I should learn a little bit of web development so that I could put up a unique website that complimented my music. This lead me down a ginormous rabbit hole. In the following year, I would spend more time learning HTML, CSS, JS, data structures, databases, servers, JS frameworks, testing frameworks libraries, webpack, etc... than in my studio creating music. Currently, I am in the process of switching careers to a developer role and freelancing projects on the side. I still wake up, everyday, excited to learn something new!

If you've actually read this far, thank you! 😘

### 📜 License

© 2019 Tony Pettigrew

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
