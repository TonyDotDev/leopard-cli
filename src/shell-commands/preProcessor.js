const getDependencyString = css => {
  if (css === 'sass') return '@zeit/next-sass node-sass';
  if (css === 'less') return '@zeit/next-less less';
  if (css === 'stylus') return '@zeit/next-stylus stylus';
  else return '';
};

const createDirectories = (shell, css) => {
  if (css === 'sass') shell.mkdir('scss');
  if (css === 'less') shell.mkdir('less');
  if (css === 'stylus') shell.mkdir('stylus');
};

module.exports = {
  getDependencyString,
  createDirectories,
};
