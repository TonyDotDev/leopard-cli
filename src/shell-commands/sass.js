const getDependencyString = css => {
  return css === 'sass' ? '@zeit/next-sass node-sass' : '';
};

const createDirectoriesAndFiles = (shell, css) => {
  if (css === 'sass') {
    shell.mkdir('scss');
    shell.cd('scss');
    shell.touch('index.scss');
    shell.cd('../');
    shell.touch('next.config.js');
  }
};

const writeFiles = (shell, css, fileInjection) => {
  if (css === 'sass') {
    shell.cd('../scss');
    shell.ShellString(fileInjection.indexSCSS).to('index.scss');
    shell.cd('../');
    shell.ShellString(fileInjection.config).to('next.config.js');
  }
};

module.exports = {
  getDependencyString,
  createDirectoriesAndFiles,
  writeFiles,
};
