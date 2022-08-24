'use strict';

console.log('yass');

// require---- this is used in the backEnd as import is to the frontEnd

const express = require('express');
const cors = require('cors');
let dataJson = require('./data/weather.json');
require('dotenv').config();

// once express is in we need to use it per express docs
const app = express();

// middleware to share resources on the internet
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTE***************************************************************

// Base route
app.get('/', (request, response) => {
  response.status(200).send('welcome boiiiiiiiiii');
});

// get JSON(API) DATA FOR WEATHER ******************************************

app.get('/weather', (request, response) => {
  try {
    let data = request.query.city;
    console.log('parameters',);
    // console.log(data);
    let dataToGroom = dataJson.find(city => city.data === data);
    let dataToSend = dataToGroom.data.map(object => {
      return new Forecast(object);
    });

    // console.log('New log', data[0].snow);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }

});



class Forecast {
  constructor(wetObj){
    this.date = wetObj.valid_date;
    this.description = wetObj.weather.description;
    this.lon = wetObj.lon;
    this.lat = wetObj.lat;
  }
}

// catch all
app.get('*', (request, response) => {
  response.status(404).send('The path you have chosen does not exist');
});

app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`we are up on PORT: ${PORT}`));

