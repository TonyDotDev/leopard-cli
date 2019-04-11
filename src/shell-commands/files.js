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
        ? '<style jsx global>{`\nbody {\npadding: 0;\nmargin: 0;\ntext-align: center;\ncolor: #121212;\n}\nheader {\nbackground-color: #FFC661;\nheight: 25vh;\nwidth: 100%;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nborder-bottom: 20px solid #6d6daa;\n}\n\nimg {\nwidth: 40%;\nmin-width: 400px;\ndisplay: block\n}\n\nh1 {\n font-size: 3.5rem;\ncolor: #6D6DAA;\nmargin: 6rem 0 1rem 0;\n}\n\nh2 {\nfont-size: 2.25rem;\ncolor: #6D6DAA;\nmargin: 5rem 0 1rem 0;\n}\n\na {\ntext-decoration: underline;\ntext-decoration-style: dotted;\ncolor: #6D6DAA;\n}\n\nul {\npadding: 0;\nmargin: 0;\nlist-style-type: none;\nline-height: 160%;\nfont-size: 1.5rem;\n}\n\n.instructions {\nline-height: 160%;\n}\n\n`}</style>'
        : '';
    return `const index = () => (
    <div>
      <header>
        <img src='https://apettigrew.imgix.net/leopard-cli/logo.svg'/>
      </header>
      <h1>${[options.name]}</h1>
      <ul>
        <li>To learn more about leopard-cli, check out our <a href='#'>docs</a>.</li>
        <li>Curious as to what tools you get out of the box with <a href='#'>NextJS</a>?</li>
        <h2>To start your project from the command line:</h2>
          <ul className="instructions">
            <li>cd ${options.name}</li>
            <li>npm run dev</li>
            <li>For more scripts, check out your package.json file</li>
          </ul>
      </ul>
      ${cssInJsx}
    </div>
  );\nexport default index;`;
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

    console.log(
      options.modules,
      options.css,
      options.normalize,
      exportPreProcessor,
    );

    const exportConfig =
      options.modules || options.normalize
        ? `withCss(${exportPreProcessor})`
        : `${exportPreProcessor}`;
    return `module.exports = ${exportConfig};`;
  },
};

const preProcessorFileInjections = {
  css: `body {
      padding: 0;
      margin: 0;
      text-align: center;
      color: #121212;
      }
      header {
      background-color: #FFC661;
      height: 25vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 20px solid #6d6daa;
      }
      
      img {
      width: 40%;
      min-width: 400px;
      display: block
      }
      
      h1 {
      font-size: 3.5rem;
      color: #6D6DAA;
      margin: 6rem 0 1rem 0;
      }
      
      h2 {
      font-size: 2.25rem;
      color: #6D6DAA;
      margin: 5rem 0 1rem 0;
      }
      
      a {
      text-decoration: underline;
      text-decoration-style: dotted;
      color: #6D6DAA;
      }
      
      ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      line-height: 160%;
      font-size: 1.5rem;
      }
      
      .instructions {
      line-height: 160%;
    }`,
};

const expressFileInjections = {
  import: `const express = require('express');\nconst next = require('next')\n\n`,
  variables: `const dev = process.env.NODE_ENV !== 'production';\nconst port = process.env.port || 3000;\nconst app = next({ dev });\nconst handle = app.getRequestHandler()\n\n;
`,
  serverJS: `app.prepare().then(() => {
    const server = express();

    // **middleware and routes go here**

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(port, err => {
      if (err) throw err;
      console.log('Listening on PORT ' + port);
    });
  });`,
};

const appJSFileInjections = {
  import: normalize => {
    const normalizeImport = normalize ? `import 'normalize.css';` : '';
    return `import App, { Container } from 'next/app';\nimport Head from 'next/head';\n${normalizeImport}\n\n`;
  },
  appComponent: `export default class myApp extends App {
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      return { pageProps };
    }\n`,
  renderHeadFunc: googleFont => {
    const googleFontLink = googleFont
      ? `<link href="https://fonts.googleapis.com/css?family=${googleFont}" rel="stylesheet" />`
      : '';
    return `renderHead() {
    return (
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${googleFontLink}
      </Head>
    );
  }\n`;
  },
  renderFunc: `render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {this.renderHead()}
        <Component {...pageProps} />
        </Container>
    );
  }
}`,
};

module.exports = {
  preProcessorFileInjections,
  nextConfigFileInjections,
  nextFileInjections,
  expressFileInjections,
  appJSFileInjections,
};
