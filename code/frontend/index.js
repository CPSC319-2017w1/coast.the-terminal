import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';

require('file-loader?name=[name].[ext]!./index.html');
ReactDOM.render(<App />, document.getElementById('home'));
