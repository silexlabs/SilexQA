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
    .then((isVisible) => {
      // wait for the blanck website to be loading
      if (!isVisible) {
        client = client.waitForVisible('.silex-stage.loading-website', 1000, false);
      }
      // wait for it to be loaded
      client
        .waitForVisible('.silex-stage.loading-website', 10000, true)
        .then(() => {
          // wait a little longer, so that the fade-in animation of the blank site is over
          setTimeout(() => {
            console.log('start test');

            // test the wysiwyg
            var wysiwygTester = new WysiwygTester()
            wysiwygTester.testInsertText(client)
              .then(wysiwygTester.testInsertContainer)
              .then(() => {
                client
                  .saveScreenshot(__dirname + '/../after-test-wysiwyg.png')
                  // stop webdriver and selenium
                  .end()
                    .then(() => {
                      console.log('end tests');
                      child.kill();
                    });
            });
          }, 1000);
      });
    });
}));
