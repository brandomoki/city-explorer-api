'use strict';

const axios = require('axios');


async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_ACCESS_KEY}`;
  console.log('************', getWeather);
  try {
    // AXIOS CALL *********************************************************************
    const weatherResponse = await axios.get(url);

    let dataToSend = weatherResponse.data.data.map(wetObj => {
      return new Forecast(wetObj);

    });
    response.status(200).send(dataToSend);
    console.log('^^^^^^^^^^^^^^^^^^^^^', getWeather);

    // console.log(weatherResponse);
  } catch (error) {
    next(error);
  }

}

class Forecast {
  constructor(wetObj){
    this.date = wetObj.valid_date;
    this.description = wetObj.weather.description;
    this.temp = wetObj.temp;
    this.lon = wetObj.lon;
    this.lat = wetObj.lat;
  }
}
module.exports = getWeather;


