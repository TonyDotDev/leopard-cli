const getDependencyStrings = modules => {
  return modules ? '@zeit/next-css' : '';
};

const writeFiles = (
  shell,
  css,
  modules,
  sassFileInjection,
  configFileInjections,
) => {
  shell.cd('../');
  if (css === 'sass') {
    shell.cd('scss');
    shell.ShellString(sassFileInjection.indexSCSS).to('index.scss');
    shell.cd('../');
  }
  shell
    .ShellString(
      configFileInjections.import(css, modules) +
        configFileInjections.export(css, modules),
    )
    .to('next.config.js');
};

module.exports = {
  getDependencyStrings,
  writeFiles,
};
