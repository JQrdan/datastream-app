import React, {useState} from 'react';
import axios from 'axios';
import config from '../../../config/config.js';

let polling = false;

const fetchGenres = (setGenres) => {
  axios.get('http://localhost:3000/genres').then(response => {
    if(response.data && response.data.genre_ratings) {
      setGenres(response.data.genre_ratings);
    }
  });
}

const PopularGenres = (props) => {
  const [genreState, setGenres] = useState({});

  if(!polling) {
    console.log('setting interval');
    setInterval(() => fetchGenres(setGenres, config.POLLING_RATE));
    polling = true;
  } 

  let jsx = [];

  console.log(genreState)

  Object.entries(genreState).forEach(([key, value]) => {
    jsx.push(
      <div>
        <h1>{key}</h1>
        <p>{value.averageRating}</p>
        <p>{value.numRatings}</p>
      </div>
    );
  });

  return jsx;
};

export default PopularGenres;
