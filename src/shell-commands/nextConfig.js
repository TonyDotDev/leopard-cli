const getDependencyStrings = modules => {
  return modules ? '@zeit/next-css' : '';
};

const writeFiles = (
  shell,
  options,
  sassFileInjection,
  configFileInjections,
) => {
  shell.cd('../');
  if (options.css === 'sass') {
    shell.cd('scss');
    shell.ShellString(sassFileInjection.indexSCSS).to('index.scss');
    shell.cd('../');
  }
  if (options.modules || options.normalize || options.css) {
    shell
      .ShellString(
        configFileInjections.import(options) +
          configFileInjections.export(options),
      )
      .to('next.config.js');
  }
};

module.exports = {
  getDependencyStrings,
  writeFiles,
};
