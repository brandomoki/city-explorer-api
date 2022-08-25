'use strict';

const axios = require('axios');

async function getMovie(request, response, next) {
  let city = request.query.city;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_ACCESS_KEY}&page=1&query=${city}`;
  console.log('************', getMovie);
  try {
    // AXIOS CALL *********************************************************************
    const movieResponse = await axios.get(movieUrl);

    let movieToGroom = movieResponse.data;
    let movieToSend = movieToGroom.results.map(movieObj => {
      return new Movielist(movieObj);

    });
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

  }
}

module.exports = getMovie;
