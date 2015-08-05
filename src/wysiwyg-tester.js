import assert from 'assert';

export default class WysiwygTester {
  constructor() {
  }
  test1(client) {
    return client
      // add a text element
      .click('div=Insert')
      .click('div=Text box')
      .frame('silex-stage-iframe')
      .waitForVisible('div=New text box', 1000)
      .isVisible('div=New text box')
      .then((isVisible) => assert(isVisible));
  }
  test2(client) {
    return client;
  }
}
