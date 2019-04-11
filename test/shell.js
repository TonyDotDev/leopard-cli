const shellCommands = require('../src/shell-commands/shell');
const { expect } = require('chai');
const expected = require('./expected');
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
      shellCommands.createProjectFolder(
        output,
        output,
        { name: 'testProject' },
        'packageJSON',
      );
      expect(output.results).to.eql(expected.outputs.createProjectFolder);
      expect(output.results.length).to.equal(4);
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

      shellCommands.installDependencies(output, output, options);
      expect(output.results).to.eql(
        expected.outputs.installDependencies.noFlags,
      );
      expect(output.results.length).to.equal(3);
    });
    it('executes the correct npm command when all flags are signaled', () => {
      const options = {
        css: 'stylus',
        server: true,
        modules: true,
        normalize: true,
      };

      shellCommands.installDependencies(output, output, options);
      expect(output.results).to.eql(
        expected.outputs.installDependencies.allFlags,
      );
      expect(output.results.length).to.equal(3);
    });
  });
  describe('createDirectories()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('creates the expected results array in the output object when --css is set to less', () => {
      const options = {
        css: 'less',
      };
      shellCommands.createDirectories(output, output, options);
      expect(output.results).to.eql(expected.outputs.createDirectories);
      expect(output.results.length).to.equal(5);
    });
  });
  describe('writeFiles()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('creates the expected results array in the output object when no flags are set', () => {
      const options = {
        css: '',
        server: false,
        modules: false,
        normalize: false,
      };

      shellCommands.writeFiles(output, output, options);
      expect(output.results).to.eql(expected.outputs.writeFiles.noFlags);
      expect(output.results.length).to.equal(5);
    });
    it('creates the expected results array in the output object when all flags are set', () => {
      const options = {
        css: 'less',
        server: true,
        modules: true,
        normalize: true,
      };

      shellCommands.writeFiles(output, output, options);
      expect(output.results).to.eql(expected.outputs.writeFiles.allFlags);
      expect(output.results.length).to.equal(11);
    });
  });
  describe('selectBrowserCommand()', () => {
    it('selects the correct browser command based on the operating system', () => {
      const browserCommand = shellCommands.selectBrowserCommand('win32');
      expect(browserCommand).to.equal('start http://localhost:3000');
    });
  });
  describe('startNext()', () => {
    afterEach(() => {
      output.results = [];
    });
    it('creates the expected results array in the output object', () => {
      const options = {
        name: 'testProject',
        platform: 'linux',
      };
      shellCommands.startNext(
        output,
        output,
        options,
        shellCommands.selectBrowserCommand,
      );
      expect(output.results).to.eql(expected.outputs.startNext);
    });
  });
});
