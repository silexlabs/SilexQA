// libs
var webdriver = require('selenium-webdriver');
var builder = new webdriver.Builder();
//var driver = builder.forBrowser('chrome').build();
var driver = builder.forBrowser('phantomjs').build();

// env vars
var SILEX_URL = process.env.SILEX_URL;

if(!SILEX_URL) {
  console.error('Env vars required: SILEX_URL');
}

console.log('Start browsing Silex at URL ', SILEX_URL);

// helper
import Helper from 'helper';
var helper = new Helper(driver, SILEX_URL);
helper.loadSilex();

// test the wysiwyg
import WysiwygTester from './wysiwyg-tester.js';
var wysiwygTester = new WysiwygTester(driver, helper);
wysiwygTester.test();
