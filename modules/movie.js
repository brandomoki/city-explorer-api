'use strict';

const axios = require('axios');

async function getMovie(request, response, next) {
  let city = request.query.city;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_ACCESS_KEY}&page=1&query=${city}`;

  try {
    // AXIOS CALL *********************************************************************
    const movieResponse = await axios.get(movieURL);

    const movieToSend = movieResponse.data.results.map(movieObj => new Movielist(movieObj));
    response.status(200).send(movieToSend);
    console.log('^^^^^^^^^movie^^^^^^^^^^^^', movieResponse);


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
