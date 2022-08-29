'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getMovie = require('./modules/movie.js');
const getWeather = require('./modules/weatherCache.js');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('welcome boiiiiiiiiii');
});

app.get('/weather', getWeather);

app.get('/movie', getMovie);


app.get('*', (request, response) => {
  response.status(404).send('The path you have chosen does not exist');
});

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
