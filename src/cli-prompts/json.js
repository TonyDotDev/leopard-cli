const jsonBuilder = async (options, cli) => {
  options.packageJSON = {};

  if (options.isCustomJSON) {
    options.packageJSON.name = options.name;
    options.packageJSON.version = options.description = await cli.prompt(
      'version (0.0.0)',
    );
    options.packageJSON.description = options.description = await cli.prompt(
      'description',
    );
    options.packageJSON.main = options.server ? 'server.js' : 'index.js';
    options.packageJSON.scripts = {
      dev: options.server ? 'node server.js' : 'next',
      build: 'next build',
      start: 'next start',
    };
    options.packageJSON.keywords = await cli.prompt('keywords');
    options.packageJSON.keywords = options.packageJSON.keywords.split(',');
    options.packageJSON.author = await cli.prompt('author');
    options.packageJSON.license = await cli.prompt('license (ISC)');
  } else {
    options.packageJSON.name = options.name;
    options.packageJSON.version = '0.0.0';
    options.packageJSON.description = '';
    options.packageJSON.main = options.server ? 'server.js' : 'index.js';
    options.packageJSON.scripts = {
      dev: options.server ? 'node server.js' : 'next',
      build: 'next build',
      start: options.server
        ? 'NODE_ENV=production node server.js'
        : 'next start',
    };
    options.packageJSON.keywords = [];
    options.packageJSON.author = '';
    options.packageJSON.license = 'ISC';
  }

  const packageJSONString = JSON.stringify(options.packageJSON);
  return packageJSONString;
};

module.exports = {
  jsonBuilder,
};
