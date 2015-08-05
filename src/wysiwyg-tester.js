import assert from 'assert';
import {describe, it} from 'mocha';

export default class WysiwygTester {
  /**
   * @param  {Main} getClient method which returns the main webdriver.io client's object
   *                          the client object canot be passed directly since it is undefined when tests are described
   * @constructor
   */
  constructor(getClient) {
    this.getClient = getClient;
  }
  describeTestText() {
    it('insert a text box', (done) => {
      this.getClient()
        .click('div=Insert')
        .click('div=Text box')
        .frame('silex-stage-iframe')
        .isVisible('div=New text box')
        .then((isVisible) => assert(isVisible))
        .then(() => done())
        .catch(done)
        .frame();
    });
  }
  describeTestContainer() {
    it('insert a container', (done) => {
      this.getClient()
        .click('div=Insert')
        .click('div=Text box')
        .frame('silex-stage-iframe')
        .isVisible('.container-element')
        .then((isVisible) => assert(isVisible))
        .then(() => done())
        .catch(done)
        .frame();
    });
  }
}
