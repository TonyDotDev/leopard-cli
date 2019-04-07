const { Command, flags } = require('@oclif/command');
const shellCommands = require('../shell-commands/shell');
const json = require('../cli-prompts/json');
class Next extends Command {
  async run() {
    const { name } = this.parse(Next).args;
    const { css, server, googleFont, modules } = this.parse(Next).flags;
    const { platform } = this.config;

    const options = {
      name,
      css,
      server,
      googleFont,
      platform,
      modules,
    };

    console.log(googleFont);

    const packageJSON = await json.jsonBuilder(options);

    shellCommands.createProjectFolder(options, packageJSON);
    shellCommands.installDependencies(options);
    shellCommands.createDirectories(options);
    shellCommands.writeFiles(options);
    shellCommands.startNext(options, shell.selectBrowserCommand);
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
    options: ['sass'],
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
