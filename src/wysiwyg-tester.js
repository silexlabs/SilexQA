
export default class WysiwygTester {
  constructor() {
  }
  test1(client) {
    return client
      // add a text element
      .click('div=Insert')
      .click('div=Text box');
  }
  test2(client) {
    return client;
  }
}
