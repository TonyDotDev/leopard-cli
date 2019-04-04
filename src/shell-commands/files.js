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

module.exports = {
  sassFileInjections,
  nextFileInjections,
};
