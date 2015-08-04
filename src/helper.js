var fs = require('fs');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

export default class Helper {
  constructor(driver, silexUrl) {
    this.driver = driver;
    this.silexUrl = silexUrl;
    this.driver.manage().window().setSize(1000, 1000);
  }
  loadSilex () {
    this.driver.get(this.silexUrl);
  }
  takeScreenshot (name) {
    this.driver.takeScreenshot().then(function(base64) {
      var tmpFileName = __dirname + '/../' + name + '.png';
      fs.writeFile(tmpFileName, base64, 'base64', function(error) {});
    });
  }
}
