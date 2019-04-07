const writeFiles = (shell, googleFont, normalize, appJSFileInjections) => {
  if (googleFont || normalize)
    shell
      .ShellString(
        appJSFileInjections.import(normalize) +
          appJSFileInjections.appComponent +
          appJSFileInjections.renderHeadFunc(googleFont) +
          appJSFileInjections.renderFunc,
      )
      .to('_app.js');
};

module.exports = {
  writeFiles,
};
