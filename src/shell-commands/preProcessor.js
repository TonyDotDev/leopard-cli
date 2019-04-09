const getDependencyString = css => {
  if (css === 'sass') return '@zeit/next-sass node-sass';
  else return '';
};

const createDirectoriesAndFiles = (shell, css) => {
  if (css === 'sass') shell.mkdir('scss');
};

module.exports = {
  getDependencyString,
  createDirectoriesAndFiles,
};
