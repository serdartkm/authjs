require('babel-polyfill'); //import "core-js/stable";
//import "regenerator-runtime/runtime";


const express = require('express');

const path = require('path');

import { MernAuthMiddleware } from '@authjs/mern'; //

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.listen('3000', () => {
  console.log('listening on port 3000');
});