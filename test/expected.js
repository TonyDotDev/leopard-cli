const outputs = {
  createProjectFolder: [
    'start: Preparing testProject',
    'mkdir: testProject',
    'cd: testProject',
    'write packageJSON to package.json',
  ],

  installDependencies: {
    noFlags: [
      'start: Installing dependencies',
      'exec: npm i next react react-dom    ',
      'stop: no_input',
    ],
    allFlags: [
      'start: Installing dependencies',
      'exec: npm i next react react-dom @zeit/next-stylus stylus express @zeit/next-css normalize.css',
      `stop: no_input`,
    ],
  },

  createDirectories: [
    'start: Creating directories',
    'mkdir: components',
    'mkdir: pages',
    'mkdir: less',
    'stop: no_input',
  ],
  writeFiles: {
    noFlags: [
      'start: Writing files',
      'cd: pages',
      "write const index = () => (\n<div>\n\t<header>\n\t\t<img src='https://apettigrew.imgix.net/leopard-cli/logo.svg'/>\n\t</header>\n\t<h1>undefined</h1>\n\t<ul>\n\t\t<li>To learn more about leopard-cli, check out our <a href='#'>docs</a>.</li>\n\t\t<li>Curious as to what tools you get out of the box with <a href='#'>NextJS</a>?</li>\n\t\t<h2>To start your project from the command line:</h2>\n\t\t<ul className=\"instructions\">\n\t\t\t<li>cd undefined</li>\n\t\t\t<li>npm run dev</li>\n\t\t\t<li>For more scripts, check out your package.json file</li>\n\t\t</ul>\n\t</ul>\n\t<style jsx global>{`\nbody {\npadding: 0;\nmargin: 0;\ntext-align: center;\ncolor: #121212;\n}\nheader {\nbackground-color: #FFC661;\nheight: 25vh;\nwidth: 100%;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nborder-bottom: 20px solid #6d6daa;\n}\n\nimg {\nwidth: 40%;\nmin-width: 400px;\ndisplay: block\n}\n\nh1 {\n font-size: 3.5rem;\ncolor: #6D6DAA;\nmargin: 6rem 0 1rem 0;\n}\n\nh2 {\nfont-size: 2.25rem;\ncolor: #6D6DAA;\nmargin: 5rem 0 1rem 0;\n}\n\na {\ntext-decoration: underline;\ntext-decoration-style: dotted;\ncolor: #6D6DAA;\n}\n\nul {\npadding: 0;\nmargin: 0;\nlist-style-type: none;\nline-height: 160%;\nfont-size: 1.5rem;\n}\n\n.instructions {\nline-height: 160%;\n}\n\n`}</style>\n</div>\n);\n\nexport default index; to index.js",
      'cd: ../',
      'stop: no_input',
    ],
    allFlags: [
      'start: Writing files',
      'cd: pages',
      "write import '../less/index.less';\n\nconst index = () => (\n<div>\n\t<header>\n\t\t<img src='https://apettigrew.imgix.net/leopard-cli/logo.svg'/>\n\t</header>\n\t<h1>undefined</h1>\n\t<ul>\n\t\t<li>To learn more about leopard-cli, check out our <a href='#'>docs</a>.</li>\n\t\t<li>Curious as to what tools you get out of the box with <a href='#'>NextJS</a>?</li>\n\t\t<h2>To start your project from the command line:</h2>\n\t\t<ul className=\"instructions\">\n\t\t\t<li>cd undefined</li>\n\t\t\t<li>npm run dev</li>\n\t\t\t<li>For more scripts, check out your package.json file</li>\n\t\t</ul>\n\t</ul>\n\t\n</div>\n);\n\nexport default index; to index.js",
      'write import App, { Container } from \'next/app\';\nimport Head from \'next/head\';\nimport \'normalize.css\';\n\nexport default class myApp extends App {\n\tstatic async getInitialProps({ Component, ctx }) {\n\t\tlet pageProps = {};\n\t\tif (Component.getInitialProps) {\n\t\t\tpageProps = await Component.getInitialProps(ctx);\n\t\t}\n\treturn { pageProps };\n}\n\n\n\trenderHead() {\n\t\treturn (\n\t\t\t<Head>\n\t\t\t\t<meta charSet="UTF-8" />\n\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t\t\t\n\t\t\t</Head>\n\t\t);\n\t};\n\n\trender() {\n\t\tconst { Component, pageProps } = this.props;\n\t\treturn (\n\t\t\t<Container>\n\t\t\t{this.renderHead()}   \n\t\t\t<Component {...pageProps} />\n\t\t</Container>\n\t\t);\n\t}\n}; to _app.js',
      'cd: ../',
      'cd: less',
      'write body {\n\tpadding: 0;\n\tmargin: 0;\n\ttext-align: center;\n\tcolor: #121212;\n}\n\nheader {\n\tbackground-color: #FFC661;\n\theight: 25vh;\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-bottom: 20px solid #6d6daa;\n}\n\nimg {\n\twidth: 40%;\n\tmin-width: 400px;\n\tdisplay: block\n}\n\nh1 {     \n\tfont-size: 3.5rem;\n\tcolor: #6D6DAA;\n\tmargin: 6rem 0 1rem 0;\n}\n\nh2 {\n\tfont-size: 2.25rem;\n\tcolor: #6D6DAA;\n\tmargin: 5rem 0 1rem 0;\n}\n\na {\n\ttext-decoration: underline;\n\ttext-decoration-style: dotted;\n\tcolor: #6D6DAA;\n}\n\nul {\n\tpadding: 0;\n\tmargin: 0;\n\tlist-style-type: none;\n\tline-height: 160%;\n\tfont-size: 1.5rem;\n}\n  \n\n.instructions {\n\tline-height: 160%;\n} to index.less',
      'cd: ../',
      "write const withCss = require('@zeit/next-css');\nconst withLess = require('@zeit/next-less');\n\nmodule.exports = withCss(withLess()); to next.config.js",
      "write const express = require('express');\nconst next = require('next')\n\nconst dev = process.env.NODE_ENV !== 'production';\nconst port = process.env.port || 3000;\nconst app = next({ dev });\nconst handle = app.getRequestHandler()\n\n;\napp.prepare().then(() => {\n\tconst server = express();\n\t// **middleware and routes go here**\n\tserver.get('*', (req, res) => {\n\t\treturn handle(req, res);\n\t})\n\tserver.listen(port, err => {\n\t\tif (err) throw err;\n\t\tconsole.log('Listening on PORT ' + port);\n\t});\n}); to server.js",
      'stop: no_input',
    ],
  },
  startNext: [
    'start: Spinning up testProject',
    'stop: \nFinished!\n\nYou can find your new project at http://localhost:3000\n\nTo start your project from the terminal:\n\ncd testProject\nnpm run dev\n\nThank you for choosing leopard-cli 🐆⚡💻',
    'exec: xdg-open http://localhost:3000',
    'exec: npm run dev',
  ],
};

module.exports = {
  outputs,
};
