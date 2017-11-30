# Front-end Setup

All frontend frameworks and tools were installed through NPM.
To get started with NPM, install Node.js and NPM globally. Download files can be found [here](https://nodejs.org/en/download/)

---
### Package installation

* To install the NPM packages:
	* Run 'npm i' in the command line in the same directory as package.json (code/frontend)
* To run the front-end project:
	* Run 'npm start'
	* Open 'localhost:1234' on a browser
* To develop while running the project:
	* Instead of running 'npm start', run 'npm run dev'
	* Open 'localhost:1234' on a browser
	* Every time you make a change in the front-end code, it will be automatically compiled
* Notes
	* If you are having issues running webpack, install webpack on your PATH by running ’npm install -g webpack’. You may need to run terminal on administrator mode on Windows or add ‘sudo’ on Mac/Linux.


---

### package.json: Scripts breakdown

```
"test": "mocha --recursive --require babel-register”
```
Starts up mocha and runs JS tests. By default, mocha searches for files under “test” directory.

```
"start": "webpack && http-server -p 1234 ./dist”
```
Runs the front end server in production mode.

```
"build": “webpack"
```
Runs webpack, which bundles all the files based on the defined configurations in web.config.json. This command will be for production builds.

```
"server": "http-server -p 1234 ./dist”
```
Starts a simple http server for the front end code to run on.

```
"watch": "webpack --watch —env.dev"
```
Runs webpack on watch mode for development. This enables the developers to not have to run the webpack command every time they make a change to the code.

```
"dev": "concurrently --kill-others \"npm run server\" \"npm run watch\”"
```
Runs web pack watch and the http server together.

---

### Selenium Test Environment 

Selenium testing requires an NPM package and some additional set-up that is not taken care of just by running 'npm i'.

* Install selenium
	* Download the standalone server through the selenium [website](http://docs.seleniumhq.org/download/)
	* The 2 NPM packages required are already part of our package.json file, but for clarity, we've listed them below:
		* nightwatch
		* selenium-webdriver 
	* Download the webdrivers (available [here](https://www.npmjs.com/package/selenium-webdriver) for the browsers you'd like to do automated testing on. 
	* Place the webdrivers in the root folder (code/frontend)
		* e.g. for chrome: download the chromedriver.exe 

* Set-up selenium
	* Create a file called: nightwatch.conf.js in the root folder (code/frontend)
		* this contains the information such as the webdriver you're using, the port the browser will be running on, etc. 
	* Create a selenium test file called: selenium.js (code/frontend/test-selenium)
		* this contains the tests
		
* Run the tests
	* Open 3 consoles
	* In the first one, run:
	```
	java -jar selenium-server-standalone-{version}.jar
	```
	* In the second one, run: 
	```
	npm run dev
	```
	* In the third one, run: 
	```
	nightwatch
	```

--- 

### Setting up the Pivot Table

The react-pivottable package is a little complex to work with and needs some additional work to be done after 'npm i'.

* Install plotly manually
    * Copy the script tag to your index.html:
    ```
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    ```
* Creating the Pivot table component
    * Create a pivot table using the same format as the example given [here](https://github.com/plotly/react-pivottable/blob/master/examples/App.jsx).
* There is a possibility that your current packages might interfere with the css.
To fix this issue manually import the css from the [example](https://github.com/plotly/react-pivottable/blob/master/src/pivottable.css) by putting it inside the ```<style></style>``` tag of index.html

---

### Documentation for Front-end Functions



---

