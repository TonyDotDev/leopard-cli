const { Command, flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const shell = require('shelljs');

const shellCommands = require('../shell-commands/shell');
const json = require('../cli-prompts/json');

shell.config.silent = true;
class Next extends Command {
  async run() {
    const { name } = this.parse(Next).args;
    const { css, server, googleFont, modules, normalize } = this.parse(
      Next,
    ).flags;
    const { platform } = this.config;

    const isCustomJSON = await cli.confirm(
      'Would you like customize package.json fields (Y/N)?',
    );

    const options = {
      name,
      css,
      server,
      googleFont,
      platform,
      modules,
      normalize,
      isCustomJSON,
    };

    const packageJSON = await json.jsonBuilder(options, cli);

    shellCommands.createProjectFolder(cli, shell, options, packageJSON);
    shellCommands.installDependencies(cli, shell, options);
    shellCommands.createDirectories(cli, shell, options);
    shellCommands.writeFiles(cli, shell, options);
    shellCommands.startNext(
      cli,
      shell,
      options,
      shellCommands.selectBrowserCommand,
    );
  }
}

const parseFontFlag = input => {
  return input.replace(/\+/g, '|');
};

Next.description = `Creates a directory with a new NextJS project complete with React and ReactDOM. Your directory will include a pages and components folder.
...
Extra documentation goes here
`;

Next.args = [{ name: 'name' }];

Next.flags = {
  css: flags.string({
    char: 'c',
    description: 'Sets up a css preprocessor for your project',
    multiple: false,
    default: '',
    options: ['sass', 'stylus', 'less'],
    required: false,
  }),
  server: flags.boolean({
    char: 's',
    description:
      'Sets up a next project that runs from a custom express server, enter the font name then a dash with no spaces and a comma separated list of font weights.',
    multiple: false,
    default: false,
    required: false,
  }),
  googleFont: flags.string({
    char: 'g',
    description:
      'Adds google font at whatever weights are specified to your custom App.js file',
    multiple: false,
    default: '',
    required: false,
    parse: parseFontFlag,
  }),
  modules: flags.boolean({
    char: 'm',
    multiple: false,
    default: false,
    required: false,
  }),
  normalize: flags.boolean({
    char: 'n',
    description: 'Add normalize.css to the_app.js file.',
    multiple: false,
    default: false,
    required: false,
  }),
};

module.exports = Next;
