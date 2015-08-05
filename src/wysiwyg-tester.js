import assert from 'assert';

export default class WysiwygTester {
  constructor() {
  }
  testInsertText(client) {
    return new Promise((resolve, reject) => {
      client
        .click('div=Insert')
        .click('div=Text box')
        .frame('silex-stage-iframe')
        .waitForVisible('div=New text box')
        .isVisible('div=New text box')
        .then((isVisible) => assert(isVisible))
        .then(() => resolve(client));
    });
  }
  testInsertContainer(client) {
    return new Promise((resolve, reject) => {
      resolve(client);
    });
  }
}
