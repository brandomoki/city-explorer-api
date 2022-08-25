'use strict';

console.log('yass');

// require---- this is used in the backEnd as import is to the frontEnd

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const axios = require('axios');

const getWeather = require('./modules/weather.js');
const getMovie = require('./modules/movie.js');

// once express is in we need to use it per express docs
const app = express();
const PORT = process.env.PORT || 3002;
// middleware to share resources on the internet
app.use(cors());

console.log('------------------------');
// EndPoints***************************************************************

// Base route
app.get('/', (request, response) => {
  response.status(200).send('welcome boiiiiiiiiii');
});

// get API DATA FOR WEATHER ******************************************

app.get('/weather', getWeather);

//********************** .getMovie api************************************ */
app.get('/movie', getMovie);


// catch all
app.get('*', (request, response) => {
  response.status(404).send('The path you have chosen does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`we are up on PORT: ${PORT}`));

