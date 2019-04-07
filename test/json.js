const { expect } = require('chai');
const { jsonBuilder } = require('../src/cli-prompts/json');
const seedData = require('./seedData');

describe('jsonBuilder', () => {
  const { defaultControl } = seedData.json;
  describe('default package JSON', () => {
    let defaultPJSON;
    beforeEach(async () => {
      const defaultOptions = {
        name: 'name',
        server: false,
        isCustomJSON: false,
      };
      defaultPJSON = await jsonBuilder(defaultOptions);
    });

    it('Creates a default package.json when no is input following the first prompt', () => {
      expect(defaultPJSON).to.equal(JSON.stringify(defaultControl));
    });
  });
});
