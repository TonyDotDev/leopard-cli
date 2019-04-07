const createDirectoriesAndFiles = (shell, googleFont) => {
  if (googleFont) shell.touch('_app.js');
};

const writeFiles = (shell, googleFont, appJSFileInjections) => {
  if (googleFont)
    shell
      .ShellString(
        appJSFileInjections.import +
          appJSFileInjections.appComponent +
          appJSFileInjections.renderHeadFunc(googleFont) +
          appJSFileInjections.renderFunc,
      )
      .to('_app.js');
};

module.exports = {
  writeFiles,
};
