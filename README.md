[![Build Status](https://travis-ci.org/CPSC319-2017w1/coast.the-terminal.svg?branch=master)](https://travis-ci.org/CPSC319-2017w1/coast.the-terminal)

# CPSC 319 repository for team The Terminal

This repository tracks the development of the project for Coast Capital

## Setting Up Backend Project With Intellij
0. You can download Intellij from https://www.jetbrains.com/idea/
1. Clone Repository into directory of your choosing
2. Open Intellij, Select "New Project from Existing Sources"
3. Select the "code" folder in the repository, Select Next
4. Choose "Import from External Module" and select "Maven", Select Next
5. Choose code folder as root directory, check "Search For Projects Recursively" and check "Import Maven projects automatically", Select Next
6. There should be one line with a checkbox and in square brackets "backend", make sure its checked. Select Next
7. Select JDK 1.8 root directory as Project SDK. If it isn't an option locate JDK 1.8 on your Computer or install JDK 1.8
8. Select Finish.

## How To Run The Front-end
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