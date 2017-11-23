module.exports = {
  'get to login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('../components/Login/')
  }