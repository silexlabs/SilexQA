import WysiwygTester from './wysiwyg-tester';
import selenium from 'selenium-standalone';
import webdriverio from 'webdriverio';

// env vars
var SILEX_URL = process.env.SILEX_URL;

if(!SILEX_URL) {
  console.error('Env vars required: SILEX_URL');
}

console.log('Start browsing Silex at URL ', SILEX_URL);

// start selenium
selenium.install({
  chrome: {
    version: '2.15',
    arch: process.arch,
    baseURL: 'http://chromedriver.storage.googleapis.com'
  }
}, () => selenium.start((err, child) => {
  var options = {
      desiredCapabilities: {
          browserName: 'chrome'
      }
  };
  let client = webdriverio.remote(options);
  client.init().url(SILEX_URL)
    // wait for Silex UI to be displayed
    .waitForVisible('.silex-menu', 10000, false)
    // wait for the blanck website to be loading
    .waitForVisible('.silex-stage.loading-website', 1000, false)
    // wait for it to be loaded
    .waitForVisible('.silex-stage.loading-website', 10000, true)
    .then((done) => {
      console.log('start test');
      let promise = client;

      // test the wysiwyg
      var wysiwygTester = new WysiwygTester();
      promise = wysiwygTester.test1(promise);
      promise = wysiwygTester.test2(promise);

      promise.saveScreenshot(__dirname + '/../test1.png')
      // stop webdriver and selenium
      .end()
        .then(() => {
          console.log('end tests');
          child.kill();
        });
    })
}));
