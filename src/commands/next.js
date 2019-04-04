const { Command, flags } = require('@oclif/command');
const shell = require('../shell-commands/shell');
const json = require('../cli-prompts/json');
class Next extends Command {
  async run() {
    const { name } = this.parse(Next).args;
    const { css, server } = this.parse(Next).flags;
    const { platform } = this.config;

    const packageJSON = await json.jsonBuilder(name, server);

    if (css === 'sass') console.log('creating sass environemnt');
    if (css === '') console.log('Vanilla CSS');

    shell.createProjectFolder(name);
    shell.installDependencies(name, packageJSON);
    shell.createDirectoriesAndFiles(name);
    shell.writeFiles(name);
    shell.startNext(platform, shell.selectBrowserCommand);
  }
}

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
    required: false,
  }),
  server: flags.boolean({
    char: 's',
    description:
      'Sets up a next project that runs from a custom express server',
    multiple: false,
    default: false,
    required: false,
  }),
};

module.exports = Next;
