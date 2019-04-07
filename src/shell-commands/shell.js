const shell = require('shelljs');
const { cli } = require('cli-ux');

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

shell.config.silent = true;

const createProjectFolder = (options, packageJSON) => {
  cli.action.start(`Preparing ${options.name}`);
  shell.mkdir(options.name);
  shell.cd(options.name);
  shell.ShellString(packageJSON).to('package.json');
};

const installDependencies = options => {
  const cssModules = nextConfig.getDependencyStrings(options.modules);
  const sass = sassyCSS.getDependencyString(options.css);
  const expressJS = express.getDependencyString(options.server);
  cli.action.start(`Installing dependencies`);
  shell.exec(`npm i next react react-dom ${sass} ${expressJS} ${cssModules}`);
  cli.action.stop();
};

const createDirectories = options => {
  cli.action.start(`Creating directories`);
  shell.cd(options.name);
  shell.mkdir('components');
  shell.mkdir('pages');
  sassyCSS.createDirectoriesAndFiles(shell, options.css);
  cli.action.stop();
};

const writeFiles = options => {
  cli.action.start(`Writing files`);
  const scssImportStatement =
    options.css === 'sass' ? sassFileInjections.import : '';
  const indexPage = scssImportStatement + nextFileInjections.indexJS;
  shell.cd('pages');
  shell.ShellString(indexPage).to('index.js');
  appPage.writeFiles(shell, options.googleFont, appJSFileInjections);
  nextConfig.writeFiles(
    shell,
    options.css,
    options.modules,
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

startNext = (options, selectBrowserCommand) => {
  const browserScript = selectBrowserCommand(options.platform);
  cli.action.stop(
    '\nThe plate has been boiled!\nYou can find your new project at http://localhost:3000\nThank you for using leopard-cli 🐆⚡💻',
  );
  shell.cd(options.name);
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
