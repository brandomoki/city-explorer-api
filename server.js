'use strict';

console.log('yass');

// require---- this is used in the backEnd as import is to the frontEnd

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

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

// get JSON(API) DATA FOR WEATHER ******************************************

app.get('/weather', getWeather);

async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_ACCESS_KEY}`;
  console.log('************', getWeather);
  try {
    // AXIOS CALL *********************************************************************
    const weatherResponse = await axios.get(url);

    let dataToGroom = weatherResponse.data;
    let dataToSend = dataToGroom.data.map(wetObj => {
      return new Forecast(wetObj);

    });
    response.status(200).send(dataToSend);
    console.log('^^^^^^^^^^^^^^^^^^^^^', weatherResponse);

    // console.log(weatherResponse);
  } catch (error) {
    next(error);
  }

}

// app.get('/movie', getMovie);

// async function getMovie(request, response, next) {
//   let movie = request.query.lat;
//   const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_ACCESS_KEY}`;
//   console.log('************', getWeather);
//   try {
//     // AXIOS CALL *********************************************************************
//     const weatherResponse = await axios.get(url);

//     let dataToGroom = weatherResponse.data;
//     let dataToSend = dataToGroom.data.map(wetObj => {
//       return new Forecast(wetObj);

//     });
//     response.status(200).send(dataToSend);
//     console.log('^^^^^^^^^^^^^^^^^^^^^', weatherResponse);

//     // console.log(weatherResponse);
//   } catch (error) {
//     next(error);
//   }

// }

//**************CLASS CONSTRUCTOR  *********************************************************/
class Forecast {
  constructor(wetObj){
    this.date = wetObj.valid_date;
    this.description = wetObj.weather.description;
    this.temp = wetObj.temp;
    this.lon = wetObj.lon;
    this.lat = wetObj.lat;
  }
}

// catch all
app.get('*', (request, response) => {
  response.status(404).send('The path you have chosen does not exist');
});

app.use((error, request, response)=> {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`we are up on PORT: ${PORT}`));

