const jsonBuilder = async (cli, options) => {
  const packageJSON = {};

  const isDefault = await cli.confirm(
    'Would you like customize package.json fields (Y/N)?',
  );

  if (isDefault) {
    packageJSON.name = options.name;
    packageJSON.version = await cli.prompt('version (0.0.0)');
    packageJSON.description = await cli.prompt('description');
    packageJSON.main = options.server ? 'server.js' : 'index.js';
    packageJSON.scripts = {
      dev: options.server ? 'node server.js' : 'next',
      build: 'next build',
      start: 'next start',
    };
    packageJSON.keywords = await cli.prompt('keywords');
    packageJSON.keywords = packageJSON.keywords.split(' ');
    packageJSON.author = await cli.prompt('author');
    packageJSON.license = await cli.prompt('license (ISC)');
  } else {
    packageJSON.name = options.name;
    packageJSON.version = '0.0.0';
    packageJSON.description = '';
    packageJSON.main = options.server ? 'server.js' : 'index.js';
    packageJSON.scripts = {
      dev: options.server ? 'node server.js' : 'next',
      build: 'next build',
      start: options.server
        ? 'NODE_ENV=production node server.js'
        : 'next start',
    };
    packageJSON.keywords = [];
    packageJSON.author = '';
    packageJSON.license = 'ISC';
  }

  const packageJSONString = JSON.stringify(packageJSON);

  return packageJSONString;
};

module.exports = {
  jsonBuilder,
};
