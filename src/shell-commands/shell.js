const shell = require('shelljs');
const { cli } = require('cli-ux');

const {
  sassFileInjections,
  nextFileInjections,
  expressFileInjections,
  appJSFileInjections,
} = require('./files');

const sassyCSS = require('./sass');
const express = require('./express');

shell.config.silent = true;

const createProjectFolder = options => {
  cli.action.start(`Preparing ${options.name}`);
  shell.mkdir(options.name);
};

const installDependencies = (options, packageJSON) => {
  const sass = sassyCSS.getDependencyString(options.css);
  const expressJS = express.getDependencyString(options.server);
  cli.action.start(`Installing dependencies`);
  shell.cd(options.name);
  shell.touch('package.json');
  shell.ShellString(packageJSON).to('package.json');
  shell.exec(`npm i next react react-dom ${sass} ${expressJS}`);
  cli.action.stop();
};

const createDirectoriesAndFiles = options => {
  cli.action.start(`Mking direcories and touching files`);
  shell.cd(options.name);
  shell.mkdir('components');
  shell.mkdir('pages');
  express.createDirectoriesAndFiles(shell, options.server);
  sassyCSS.createDirectoriesAndFiles(shell, options.css);
  shell.cd('pages');
  shell.touch('index.js');
  if (options.googleFont) shell.touch('_app.js');
  cli.action.stop();
};

const writeFiles = options => {
  cli.action.start(`Writing files`);
  const scssImportStatement =
    options.css === 'sass' ? sassFileInjections.import : '';
  const indexPage = scssImportStatement + nextFileInjections.indexJS;
  express.writeFiles(shell, options.server, expressFileInjections);
  shell.ShellString(indexPage).to('index.js');
  if (options.googleFont)
    shell
      .ShellString(
        appJSFileInjections.import +
          appJSFileInjections.appComponent +
          appJSFileInjections.renderHeadFunc(options.googleFont) +
          appJSFileInjections.renderFunc,
      )
      .to('_app.js');
  sassyCSS.writeFiles(shell, options.css, sassFileInjections);
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
  createDirectoriesAndFiles,
  writeFiles,
  selectBrowserCommand,
  startNext,
};
