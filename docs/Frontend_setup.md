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
