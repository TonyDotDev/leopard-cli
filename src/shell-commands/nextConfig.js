const getDependencyStrings = options => {
  if (options.modules || options.normalize) return '@zeit/next-css';
  else return '';
};

const writeFiles = (
  shell,
  options,
  preProcessorFileInjections,
  configFileInjections,
) => {
  shell.cd('../');
  writePreProcessorFile(shell, options.css, preProcessorFileInjections);
  if (options.modules || options.normalize || options.css) {
    shell
      .ShellString(
        configFileInjections.import(options) +
          configFileInjections.export(options),
      )
      .to('next.config.js');
  }
};

const writePreProcessorFile = (shell, css, preProcessorFileInjections) => {
  if (css === 'sass') {
    shell.cd('scss');
    shell.ShellString(preProcessorFileInjections.css).to('index.scss');
    shell.cd('../');
  }
  if (css === 'less') {
    shell.cd('less');
    shell.ShellString(preProcessorFileInjections.css).to('index.less');
    shell.cd('../');
  }
  if (css === 'stylus') {
    shell.cd('stylus');
    shell.ShellString(preProcessorFileInjections.css).to('index.styl');
    shell.cd('../');
  }
};

module.exports = {
  getDependencyStrings,
  writeFiles,
};
