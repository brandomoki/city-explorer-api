'use strict';

let cache = require('./cache.js');
const axios = require('axios');


async function getWeather(request, response, next) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  const key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_ACCESS_KEY}&days=5&units=I`;
  try {


    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit weather');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss weather');
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let weatherResults = await axios.get(url);
      let dataToSend = weatherResults.data.data.map(wetObj => new Forecast(wetObj));
      cache[key] = {
        data: dataToSend,
        timestamp: Date.now()
      };
      response.status(200).send(dataToSend);

    }


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

