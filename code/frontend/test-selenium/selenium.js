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
    // Contractor Information
    // set first name as Harry
      .setValue('input[data-qa="firstname"]', "Harry")
    // set last name to Potter
      .setValue('input[data-qa="lastname"]', "Potter")
    // set agency to Gryffindor
      .setValue('input[data-qa="agency"]', "Gryffindor")
    // set Status to active
      .click('input[data-qa="inactive"]')
      .click('input[data-qa="active"]')

    // Project Information
    // set project name as Dumbledore's Army
      .setValue('input[data-qa="project"]', "Dumbledore's Army")
    // set reporting manager to Jerry
      .click('select[data-qa="pm"] option[value="62c4a147-1e8f-42a3-ba52-69e384da439d"]')
    // set cost centre to Vancouver
      .click('select[data-qa="costcentre"]')
    //TODO: date tests
    // set start date
    // set end date
    // set HR position to HR manager
      .click('select[data-qa="hrposition"] option[value="243bd882-c992-11e7-abc4-cec278b6b50a"]')
    // set rate type to monthly
      .click('select[data-qa="rate"]')
    // set est. rate to 200
      .setValue('input[data-qa="estrate"]', "200")
    // set hr pay grade to A
      .click('select[data-qa="hrpay"] option[value="53232d6a-73dd-4fc9-aa42-3757acb09a59"]')
    // set PO ref # to 1234567
      .setValue('input[data-qa="pref"]', "1234567")
    // set time and material terms to 20
      .setValue('input[data-qa="time"]', "20")
    // set allowance expense to 10
      .setValue('input[data-qa="allow"]', "10")
    // set main skill to default
      .click('select[data-qa="mainskill"]')
    // set original documentation to yes
      .setValue('input[data-qa="original"]', "yes")
    // set notification to 5
      .setValue('input[data-qa="notif"]', "5")
    // set charge type as operating costs
      .click('input[data-qa="operational"]')
    // set currency to cad
      .click('input[data-qa="cad"]')

    // add contractor to database
      .click('input[data-qa="addcontractor"]')
      .pause(1000)
      .acceptAlert()
      .pause(1000)
      .acceptAlert()
  },

  'admin table': (browser) => {
    browser
  }

  // 'contractor information': (browser) => {
  //   browser
  // }

  //
  // 'edit contractor': (browser) => {
  //   browser
  // },
  //
  // 'filtering': (browser) => {
  //   browser
  // },
  //
  // 'reports': (browser) => {
  //   browser
  // },
  //
  // 'admin dashboard': (browser) => {
  //   browser
  // },
  //

  //
  // 'logout': (browser) => {
  //   browser
  // },

};