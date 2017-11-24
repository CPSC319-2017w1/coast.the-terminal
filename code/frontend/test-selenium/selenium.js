module.exports = {
  'get to login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('div[data-qa="login-wrapper"]', 10000)
      .click('input[data-qa="login-button"]');
  }
};