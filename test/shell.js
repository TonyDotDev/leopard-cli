const shellCommands = require('../src/shell-commands/shell');
const { expect } = require('chai');

const output = {
  results: [],
  action: {
    start: input => output.results.push(`start: ${input}`),
    stop: input => {
      if (!input) output.results.push(`stop: no_input`);
      else output.results.push(`stop: ${input}`);
    },
  },
  mkdir: input => output.results.push(`mkdir: ${input}`),
  cd: input => output.results.push(`cd: ${input}`),
  exec: input => output.results.push(`exec: ${input}`),
  ShellString: input => ({
    to: file => output.results.push(`write ${input} to ${file}`),
  }),
};

describe('shellCommands', () => {
  describe('createProjectFolder()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('creates the expected results array in the output object', () => {
      const expectedOutput = [
        'start: Preparing testProject',
        'mkdir: testProject',
        'cd: testProject',
        'write packageJSON to package.json',
      ];

      shellCommands.createProjectFolder(
        output,
        output,
        { name: 'testProject' },
        'packageJSON',
      );
      expect(output.results).to.eql(expectedOutput);
    });
  });
  describe('installDependencies()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('executes the correct npm command when no flags are signaled', () => {
      const options = {
        css: '',
        server: false,
        modules: false,
        normalize: false,
      };

      expectedOutput = [
        'start: Installing dependencies',
        'exec: npm i next react react-dom    ',
        'stop: no_input',
      ];
      shellCommands.installDependencies(output, output, options);
      expect(output.results).to.eql(expectedOutput);
    });
    it('executes the correct npm command when all flags are signaled', () => {
      const options = {
        css: 'stylus',
        server: true,
        modules: true,
        normalize: true,
      };

      expectedOutput = [
        'start: Installing dependencies',
        'exec: npm i next react react-dom @zeit/next-stylus stylus express @zeit/next-css normalize.css',
        `stop: no_input`,
      ];
      shellCommands.installDependencies(output, output, options);
      expect(output.results).to.eql(expectedOutput);
    });
  });
  describe('createDirectories()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('creates the expected results array in the output object when --css not set', () => {
      const expectedOutput = [
        'start: Creating directories',
        'mkdir: components',
        'mkdir: pages',
        'stop: no_input',
      ];
      const options = {
        css: '',
      };

      shellCommands.createDirectories(output, output, options);
      expect(output.results).to.eql(expectedOutput);
    });
    it('creates the expected results array in the output object when --css is set to less', () => {
      const expectedOutput = [
        'start: Creating directories',
        'mkdir: components',
        'mkdir: pages',
        'mkdir: less',
        'stop: no_input',
      ];
      const options = {
        css: 'less',
      };

      shellCommands.createDirectories(output, output, options);
      expect(output.results).to.eql(expectedOutput);
    });
  });
});
