const getDependencyString = server => {
  return server ? 'express' : '';
};

const writeFiles = (shell, server, fileInjection) => {
  if (server) {
    shell
      .ShellString(
        fileInjection.import + fileInjection.variables + fileInjection.serverJS,
      )
      .to('server.js');
  }
};

module.exports = {
  getDependencyString,
  writeFiles,
};
