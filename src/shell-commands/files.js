const nextFileInjections = {
  indexJS: `const index = () => <div><h1>Index Page</h1></div>;\nexport default index;`,
};

const sassFileInjections = {
  import: `import '../scss/index.scss';\n\n`,
  config: `const withSass = require('@zeit/next-sass');\nmodule.exports = withSass();`,
  indexSCSS: `h1 {
    color: #3233ef;
    font-size: 200px;
    text-align: center;
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

module.exports = {
  sassFileInjections,
  nextFileInjections,
  expressFileInjections,
};
