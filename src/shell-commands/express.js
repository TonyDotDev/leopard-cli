const getDependencyString = server => {
  return server ? 'express' : '';
};

const createDirectoriesAndFiles = (shell, server) => {
  if (server) shell.touch('server.js');
};

const writeFiles = (shell, server, fileInjection) => {
  if (server) {
    shell.cd('../');

    shell
      .ShellString(
        fileInjection.import + fileInjection.variables + fileInjection.serverJS,
      )
      .to('server.js');
    shell.cd(`pages`);
  }
};

module.exports = {
  getDependencyString,
  createDirectoriesAndFiles,
  writeFiles,
};
