// test for login page

module.exports = {
  'get to login page, log in': (browser) => {
    browser
      // load page
      .url(browser.launchUrl)
      // wait for page to load
      .waitForElementVisible('div[data-qa="login-wrapper"]', 3000)
      // set the value for user login
      .setValue('input[data-qa="loginInput"]', "admin")
      // set the value for password
      .setValue('input[data-qa="loginpw"]', "admin")
      // click the button to login
      .click('input[data-qa="login-button"]')
      // wait for the dashboard page to load
      .waitForElementVisible('div[data-qa="dashboard-wrapper"]', 3000)
      // check if the page loaded was the dashboard page
      .getText('h1[data-qa="dashboard-header"]', function(comp) {
        this.assert.equal(comp.value, 'Dashboard')
    })
  },

  'dashboard buttons': (browser) => {
    browser
      // click the data filtering button to navigate to that page
      .click('button[data-qa="datafilterbtn"]')
      // wait for the data filtering page to load
      .waitForElementVisible('div[data-qa="filtering-wrapper"]', 3000)
      // check if page loaded was the filtering page
      .getText('h1[data-qa="filtering-header"]', function(comp) {
        this.assert.equal(comp.value, 'Data Filtering System')
      })
      // go back to dashboard
      .click('li[data-qa="dashboard-nav"]')

      // click the contractor information button to navigate to that page
      .click('button[data-qa="infobtn"]')
      // wait for the data filtering page to load
      .waitForElementVisible('div[data-qa=info-wrapper]', 3000)
      // check if page loaded was the information page
      .getText('h1[data-qa="info-header"]', function(comp) {
        this.assert.equal(comp.value, 'Contractor Information')
      })
      // go back to dashboard
      .click('li[data-qa="dashboard-nav"]')

      // click the reports button to navigate to that page
      .click('button[data-qa="reportsbtn"]')
      // wait for the reports page to load
      .waitForElementVisible('div[data-qa="reports-wrapper"]', 3000)
      // check if page loaded was the filtering page
      .getText('h1[data-qa="reports-header"]', function(comp) {
        this.assert.equal(comp.value, 'Trending Reports')
      })
      // go back to dashboard
      .click('li[data-qa="dashboard-nav"]')

      //click the add contractor button to navigate to that page
      .click('button[data-qa="addbtn"]')
      // wait for the add contractor page to load
      .waitForElementVisible('div[data-qa="add-wrapper"]', 3000)
      // check if page loaded was the add contractor page
      .getText('h1[data-qa="add-header"]', function(comp) {
        this.assert.equal(comp.value, 'Add Contractor')
      })
  },

  'add contractors': (browser) => {
    browser
      .setValue('input[data-qa="loginInput"]', "admin")

}

};