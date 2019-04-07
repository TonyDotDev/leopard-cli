const getDependencyString = css => {
  return css === 'sass' ? '@zeit/next-sass node-sass' : '';
};

const createDirectoriesAndFiles = (shell, css) => {
  if (css === 'sass') {
    shell.mkdir('scss');
    // shell.cd('scss');
    // shell.touch('index.scss');
    // shell.cd('../');
  }
};

module.exports = {
  getDependencyString,
  createDirectoriesAndFiles,
};
