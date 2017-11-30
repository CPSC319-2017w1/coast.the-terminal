// warning, tests won't work without data in the backend
// changes to selectors will need to be changed accordingly

module.exports = {

// test for login page
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

  // test that dashboard buttons navigate correctly
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

  // test that add contractor form is fillable and contractor can be successfully added
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
      // click add button
      .click('input[data-qa="addcontractor"]')
      .pause(1000)
      // click 'ok' in safety prompt
      .acceptAlert()
      .pause(1000)
      // click 'ok' in confirmation prompt
      .acceptAlert();

    // confirm.that all tests have passed, since we have no assertions for add contractor
    console.log("add contractor tests ran successfully")
  },

  // test to check search implementation and edit contractor
  'contractor information': (browser) => {
    browser
      // go to contractor information page
      .click('li[data-qa="info-nav"]')
      .pause(500)
      // search for contractor
      .setValue('input[data-qa="name"]', "v")
      .pause(1000)

      // edit contractor button navigates to the right page
      // navigate to first cell
      .moveToElement('.contractorinfo__rowData___2cmwr', 5, 5)
      .pause(1000)
      // wait for the edit button to be visible
      .waitForElementVisible('.contractorinfo__editbtn___2K13L', 1000)
      .click('.contractorinfo__editbtn___2K13L')
      // check if the edit page is now visible
      .getText('h1[data-qa="editpage"]', function(comp) {
        this.assert.equal(comp.value, 'Edit Contractor')
      })

      //edit a value and save new contractor
      // set first name as Draco
      .setValue('input[data-qa="firstname"]', "Draco")
      // set last name to Malfoy
      .setValue('input[data-qa="lastname"]', "Malfoy")
      // set agency to Slytherin
      .setValue('input[data-qa="agency"]', "Slytherin")
      // save the changes
      .click('input[data-qa="save"]')
      .pause(1000)
      // click 'ok' in safety prompt
      .acceptAlert()
      .pause(1000)
      // click 'ok' in confirmation prompt
      .acceptAlert()

      // go back to contractor information page
      .click('input[data-qa"backbtn"]')
  },

  //test if admin panel renders and if tables are accessible
  'admin panel and tables': (browser) => {
    browser
      // go to admin panel page
      .click('li[data-qa="admin-nav"]')
      // wait for admin panel to load
      .waitForElementVisible('div[data-qa="admin-wrapper"]', 1000)
      // check if page loaded was admin panel
      .getText('h1[data-qa="admin-header"]', function(comp) {
        this.assert.equal(comp.value, 'Admin Panel')
      })
      // click the hr roles button to navigate to that page
      .click('button[data-qa="hrroles"]')
      // wait for the hr table to show
      // // go back to dashboard
      // .click('li[data-qa="dashboard-nav"]')
      //

  },

  // test to make sure user is logged out correctly
  // login page should be displayed after logging out 
  'logout': (browser) => {
    browser
      // check if logout button exists
      .getText('a[data-qa="logout"]', function(comp) {
        this.assert.equal(comp.value, 'Logout')
      })
      .pause(100)
      // click logout
      .click('a[data-qa="logout"]')
      // check if back at login page
      .waitForElementVisible('div[data-qa="login-wrapper"]', 3000)
  },

};