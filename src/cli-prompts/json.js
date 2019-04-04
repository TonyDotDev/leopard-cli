const { cli } = require('cli-ux');

const jsonBuilder = async (name, server) => {
  const packageJSON = {};

  const isDefault = await cli.confirm(
    'Would you like customize you package.json fields?',
  );

  if (isDefault) {
    packageJSON.name = name;
    packageJSON.version = await cli.prompt('version (0.0.0)');
    packageJSON.description = await cli.prompt('description');
    packageJSON.main = server ? 'server.js' : 'index.js';
    packageJSON.scripts = {
      dev: server ? 'node server.js' : 'next',
      build: 'next build',
      start: 'next start',
    };
    packageJSON.keywords = await cli.prompt('keywords').split(' ');
    packageJSON.author = await cli.prompt('author');
    packageJSON.license = await cli.prompt('license (ISC)');
  } else {
    packageJSON.name = name;
    packageJSON.version = '0.0.0';
    packageJSON.description = '';
    packageJSON.main = server ? 'server.js' : 'index.js';
    packageJSON.scripts = {
      dev: server ? 'node server.js' : 'next',
      build: 'next build',
      start: 'next start',
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
