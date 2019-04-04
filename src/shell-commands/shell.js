const shell = require('shelljs');
const { cli } = require('cli-ux');

const { sassFileInjections, nextFileInjections } = require('./files');
const sassyCSS = require('./sass');

shell.config.silent = true;

const createProjectFolder = name => {
  cli.action.start(`Preparing ${name}`);
  shell.mkdir(name);
};

const installDependencies = (name, css, packageJSON) => {
  const sass = sassyCSS.getDependencyString(css);
  cli.action.start(`Installing dependencies`);
  shell.cd(name);
  shell.touch('package.json');
  shell.ShellString(packageJSON).to('package.json');
  shell.exec(`npm i next react react-dom ${sass}`);
};

const createDirectoriesAndFiles = (name, css) => {
  cli.action.start(`Mking direcories and touching files`);
  shell.cd(name);
  shell.mkdir('components');
  shell.mkdir('pages');
  sassyCSS.createDirectoriesAndFiles(shell, css);
  shell.cd('pages');
  shell.touch('index.js');
};

const writeFiles = (name, css) => {
  cli.action.start(`Writing files`);
  const scssImportStatement = css === 'sass' ? sassFileInjections.import : '';
  const indexPage = scssImportStatement + nextFileInjections.indexJS;
  shell.cd(`${name}/pages`);
  shell.ShellString(indexPage).to('index.js');
  sassyCSS.writeFiles(shell, css, sassFileInjections);
};

const selectBrowserCommand = platform => {
  let script = '';
  const address = 'http://localhost:3000';

  if (platform === 'win32') script = `start ${address}`;
  else if (platform === 'linux') script = `xdg-open ${address}`;
  else if (platform === 'darwin') script = `open ${address}`;
  return script;
};

startNext = (name, platform, selectBrowserCommand) => {
  const browserScript = selectBrowserCommand(platform);
  cli.action.stop(
    '\nThe plate has been boiled!\nYou can find your new project at http://localhost:3000\nThank you for using leopard-cli 🐆⚡💻',
  );
  shell.cd(name);
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
