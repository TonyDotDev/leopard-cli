const { Command, flags } = require('@oclif/command');
const shell = require('../shell-commands/shell');
const json = require('../cli-prompts/json');
class Next extends Command {
  async run() {
    const { name } = this.parse(Next).args;
    const { css, server, googleFont } = this.parse(Next).flags;
    const { platform } = this.config;

    if (googleFont[0] === undefined)
      throw new Error(
        `The (--googleFont, -g) argument was not formatted correctly. Please pass the argument in this format: --googleFont=comic sans-800,400,200`,
      );

    const options = {
      name,
      css,
      server,
      googleFont,
      platform,
    };

    const packageJSON = await json.jsonBuilder(options);

    shell.createProjectFolder(options);
    shell.installDependencies(options, packageJSON);
    shell.createDirectoriesAndFiles(options);
    shell.writeFiles(options);
    shell.startNext(options, shell.selectBrowserCommand);
  }
}

const parseFontFlag = input => {
  let weight = input.split('-');

  let font = weight.splice(0, 1);

  weight = weight
    .join()
    .split(',')
    .map(fontWeight => parseInt(fontWeight, 10));
  font = font.join();

  if (!font || !weight || !weight[0]) return undefined;
  return { font, weight };
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
    multiple: true,
    default: '',
    required: false,
    parse: parseFontFlag,
  }),
};

module.exports = Next;
