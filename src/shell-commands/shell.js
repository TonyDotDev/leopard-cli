const {
  sassFileInjections,
  nextConfigFileInjections,
  nextFileInjections,
  expressFileInjections,
  appJSFileInjections,
} = require('./files');

const sassyCSS = require('./sass');
const express = require('./express');
const nextConfig = require('./nextConfig');
const appPage = require('./app');
const normalize = require('./normalize');

const createProjectFolder = (cli, shell, options, packageJSON) => {
  cli.action.start(`Preparing ${options.name}`);
  shell.mkdir(options.name);
  shell.cd(options.name);
  shell.ShellString(packageJSON).to('package.json');
};

const installDependencies = (cli, shell, options) => {
  const cssModules = nextConfig.getDependencyStrings(options.modules);
  const sass = sassyCSS.getDependencyString(options.css);
  const expressJS = express.getDependencyString(options.server);
  const normalizeCss = normalize.getDependencyString(options.normalize);
  cli.action.start(`Installing dependencies`);
  shell.exec(
    `npm i next react react-dom ${sass} ${expressJS} ${cssModules} ${normalizeCss}`,
  );
  cli.action.stop();
};

const createDirectories = (cli, shell, options) => {
  cli.action.start(`Creating directories`);
  shell.mkdir('components');
  shell.mkdir('pages');
  sassyCSS.createDirectoriesAndFiles(shell, options.css);
  cli.action.stop();
};

const writeFiles = (cli, shell, options) => {
  cli.action.start(`Writing files`);
  const scssImportStatement =
    options.css === 'sass' ? sassFileInjections.import : '';
  const indexPage = scssImportStatement + nextFileInjections.indexJS;
  shell.cd('pages');
  shell.ShellString(indexPage).to('index.js');
  appPage.writeFiles(
    shell,
    options.googleFont,
    options.normalize,
    appJSFileInjections,
  );
  nextConfig.writeFiles(
    shell,
    options,
    sassFileInjections,
    nextConfigFileInjections,
  );
  express.writeFiles(shell, options.server, expressFileInjections);
  cli.action.stop();
};

const selectBrowserCommand = platform => {
  let script = '';
  const address = 'http://localhost:3000';

  if (platform === 'win32') script = `start ${address}`;
  else if (platform === 'linux') script = `xdg-open ${address}`;
  else if (platform === 'darwin') script = `open ${address}`;
  return script;
};

startNext = (cli, shell, options, selectBrowserCommand) => {
  const browserScript = selectBrowserCommand(options.platform);
  cli.action.start(`Spinning up ${options.name}`);
  cli.action.stop(
    `\nFinished!\n\nYou can find your new project at http://localhost:3000\n\nTo start your project from the terminal:\n\ncd ${
      options.name
    }\nnpm run dev\n\nThank you for choosing leopard-cli 🐆⚡💻`,
  );
  shell.exec(browserScript).exec('npm run dev');
};

module.exports = {
  createProjectFolder,
  installDependencies,
  createDirectories,
  writeFiles,
  selectBrowserCommand,
  startNext,
};
