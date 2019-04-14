const nextFileInjections = {
  preProcessorFileImport: css => {
    if (css === 'sass') return `import '../scss/index.scss';\n\n`;
    if (css === 'less') return `import '../less/index.less';\n\n`;
    if (css === 'stylus') return `import '../stylus/index.styl';\n\n`;
    else return '';
  },
  indexJS: options => {
    const cssInJsx =
      options.css === ''
        ? '<style jsx global>{`\nbody {\npadding: 0;\nmargin: 0;\ntext-align: center;\ncolor: #121212;\n}\nheader {\nbackground-color: #bbc4ef;\nheight: 25vh;\nwidth: 100%;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nborder-bottom: 20px solid #6d6daa;\n}\n\nimg {\nwidth: 40%;\nmin-width: 400px;\ndisplay: block\n}\n\nh1 {\n font-size: 3.5rem;\ncolor: #6D6DAA;\nmargin: 6rem 0 1rem 0;\n}\n\nh2 {\nfont-size: 2.25rem;\ncolor: #6D6DAA;\nmargin: 5rem 0 1rem 0;\n}\n\na {\ntext-decoration: underline;\ntext-decoration-style: dotted;\ncolor: #6D6DAA;\n}\n\nul {\npadding: 0;\nmargin: 0;\nlist-style-type: none;\nline-height: 160%;\nfont-size: 1.5rem;\n}\n\n.instructions {\nline-height: 160%;\n}\n\n`}</style>'
        : '';
    return `const index = () => (\n<div>\n\t<header>\n\t\t<img src='https://apettigrew.imgix.net/leopard-cli/logo.svg'/>\n\t</header>\n\t<h1>${
      options.name
    }</h1>\n\t<ul>\n\t\t<li>To learn more about leopard-cli, check out our <a href='https://github.com/NeverEnder4/leopard-cli'>docs</a>.</li>\n\t\t<li>Curious as to what tools you get out of the box with <a href='https://nextjs.org/docs/'>NextJS</a>?</li>\n\t\t<h2>To start your project from the command line:</h2>\n\t\t<ul className="instructions">\n\t\t\t<li>cd ${
      options.name
    }</li>\n\t\t\t<li>npm run dev</li>\n\t\t\t<li>For more scripts, check out your package.json file</li>\n\t\t</ul>\n\t</ul>\n\t${cssInJsx}\n</div>\n);\n\nexport default index;`;
  },
};

const nextConfigFileInjections = {
  import: options => {
    let importPreProcessor;
    switch (options.css) {
      case 'sass':
        importPreProcessor = `const withSass = require('@zeit/next-sass');`;
        break;

      case 'less':
        importPreProcessor = `const withLess = require('@zeit/next-less');`;
        break;

      case 'stylus':
        importPreProcessor = `const withStylus = require('@zeit/next-stylus');`;
        break;

      default:
        importPreProcessor = '';
        break;
    }
    const importModules =
      options.modules || options.normalize
        ? `const withCss = require('@zeit/next-css');`
        : '';
    return `${importModules}\n${importPreProcessor}\n\n`;
  },
  export: options => {
    let exportPreProcessor;
    switch (options.css) {
      case 'sass':
        exportPreProcessor = `withSass()`;
        break;
      case 'less':
        exportPreProcessor = `withLess()`;
        break;
      case 'stylus':
        exportPreProcessor = `withStylus()`;
        break;

      default:
        exportPreProcessor = '';
        break;
    }

    const exportConfig =
      options.modules || options.normalize
        ? `withCss(${exportPreProcessor})`
        : `${exportPreProcessor}`;
    return `module.exports = ${exportConfig};`;
  },
};

const preProcessorFileInjections = {
  css: `body {\n\tpadding: 0;\n\tmargin: 0;\n\ttext-align: center;\n\tcolor: #121212;\n}\n\nheader {\n\tbackground-color: #bbc4ef;\n\theight: 25vh;\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tborder-bottom: 20px solid #6d6daa;\n}\n\nimg {\n\twidth: 40%;\n\tmin-width: 400px;\n\tdisplay: block\n}\n\nh1 {     \n\tfont-size: 3.5rem;\n\tcolor: #6D6DAA;\n\tmargin: 6rem 0 1rem 0;\n}\n\nh2 {\n\tfont-size: 2.25rem;\n\tcolor: #6D6DAA;\n\tmargin: 5rem 0 1rem 0;\n}\n\na {\n\ttext-decoration: underline;\n\ttext-decoration-style: dotted;\n\tcolor: #6D6DAA;\n}\n\nul {\n\tpadding: 0;\n\tmargin: 0;\n\tlist-style-type: none;\n\tline-height: 160%;\n\tfont-size: 1.5rem;\n}
  \n\n.instructions {\n\tline-height: 160%;\n}`,
};

const expressFileInjections = {
  import: `const express = require('express');\nconst next = require('next')\n\n`,
  variables: `const dev = process.env.NODE_ENV !== 'production';\nconst port = process.env.port || 3000;\nconst app = next({ dev });\nconst handle = app.getRequestHandler()\n\n;
`,
  serverJS: `app.prepare().then(() => {\n\tconst server = express();\n\t// **middleware and routes go here**\n\tserver.get('*', (req, res) => {\n\t\treturn handle(req, res);\n\t})\n\tserver.listen(port, err => {\n\t\tif (err) throw err;\n\t\tconsole.log('Listening on PORT ' + port);\n\t});\n});`,
};

const appJSFileInjections = {
  import: normalize => {
    const normalizeImport = normalize ? `import 'normalize.css';` : '';
    return `import App, { Container } from 'next/app';\nimport Head from 'next/head';\n${normalizeImport}\n\n`;
  },
  appComponent: `export default class myApp extends App {\n\tstatic async getInitialProps({ Component, ctx }) {\n\t\tlet pageProps = {};\n\t\tif (Component.getInitialProps) {\n\t\t\tpageProps = await Component.getInitialProps(ctx);\n\t\t}\n\treturn { pageProps };\n}\n`,
  renderHeadFunc: googleFont => {
    const googleFontLink = googleFont
      ? `<link href="https://fonts.googleapis.com/css?family=${googleFont}" rel="stylesheet" />`
      : '';
    return `\n\n\trenderHead() {\n\t\treturn (\n\t\t\t<Head>\n\t\t\t\t<meta charSet="UTF-8" />\n\t\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t\t\t${googleFontLink}\n\t\t\t</Head>\n\t\t);\n\t};`;
  },
  renderFunc: `\n\n\trender() {\n\t\tconst { Component, pageProps } = this.props;\n\t\treturn (\n\t\t\t<Container>\n\t\t\t{this.renderHead()}   \n\t\t\t<Component {...pageProps} />\n\t\t</Container>\n\t\t);\n\t}\n};`,
};

module.exports = {
  preProcessorFileInjections,
  nextConfigFileInjections,
  nextFileInjections,
  expressFileInjections,
  appJSFileInjections,
};
