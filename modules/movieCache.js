'use strict';

let cache = require('./cache.js');
const axios = require('axios');


async function getMovie(request, response, next) {
  const key = 'movie-' + city;
  let city = request.query.city;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_ACCESS_KEY}&page=1&query=${city}`;
  try {


    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit weather');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss weather');
      cache[key] = {};
      cache[key].timestamp = Date.now();

      let movieResults = await axios.get(movieURL);
      let movieToSend = movieResults.data.results.map(wetObj => new Movielist(wetObj));
      cache[key] = {
        data: movieToSend,
        timestamp: Date.now()
      };
      response.status(200).send(movieToSend);

    }


  } catch (error) {
    next(error);
  }

}

class Movielist {
  constructor(movieObj){
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.original_title = movieObj.original_title;
    this.overview = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.poster = movieObj.poster_path;
    this.name = movieObj.name;

  }
}

module.exports = getMovie;

