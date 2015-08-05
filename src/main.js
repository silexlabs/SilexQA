import WysiwygTester from './wysiwyg-tester';
import selenium from 'selenium-standalone';
import webdriverio from 'webdriverio';

class Main {
  constructor() {
    // env vars
    this.silexUrl = process.env.SILEX_URL;

    if(!this.silexUrl) {
      console.error('Env vars required: SILEX_URL');
    }

    console.log('Start browsing Silex at URL ', this.silexUrl);
  }
  getClient() {
    return this.client;
  }
  initClient(cbk) {
    // start selenium
    selenium.install({
      chrome: {
        version: '2.15',
        arch: process.arch,
        baseURL: 'http://chromedriver.storage.googleapis.com'
      }
    }, () => selenium.start((err, child) => {
      // store child for closing at the end
      this.child = child;
      // open a browser window
      this.client = webdriverio.remote({
        desiredCapabilities: {
            browserName: 'chrome'
        }
      });
      cbk();
    }));
  }
  describeTests() {
    var main = this;
    // define init hook, exectuted by mocha before tests
    before(function (done) {
      this.timeout(10000);
      main.initClient(function () {
        // navigate to Silex
        main.client.init().url(main.silexUrl)
          // wait for Silex UI to be displayed
          .waitForVisible('.silex-menu', 10000, false)
          .then(function isVisible(e) {
            // wait for the blanck website to be loading
            if (!isVisible) {
              main.client = main.client.waitForVisible('.silex-stage.loading-website', 1000, false);
            }
            // wait for it to be loaded
            main.client
              .waitForVisible('.silex-stage.loading-website', 10000, true)
              .then(function () {
                // wait a little longer, so that the fade-in animation of the blank site is over
                setTimeout(function () {
                  done();
                }, 1000);
            });
          });
      });
    });
    after(function (done) {
      main.client.end().then(function () {
        done();
      });
    });
    // wysiwyg tests
    describe('wysiwyg tests', () => {
      var wysiwygTester = new WysiwygTester(this.getClient.bind(this));
      wysiwygTester.describeTestText();
      wysiwygTester.describeTestContainer();
    });
  }
  runTests() {
    mocha.run();
  }
}

let main = new Main();
main.describeTests();
