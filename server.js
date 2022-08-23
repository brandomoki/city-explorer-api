'use strict';

console.log('yass');

// bringing in express
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`we are up on PORT: ${PORT}`));

