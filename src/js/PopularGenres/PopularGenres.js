import React, {useState} from 'react';
import axios from 'axios';
import config from '../../../config/config.js';

const PopularGenres = (props) => {
  const [genreState, setGenres] = useState({});
  const [polling, setPolling] = useState(false);

  if(!polling) {
    const poll = setInterval(() => {
      axios.get('http://localhost:3000/genres').then(response => {
        if(response.data && response.data.genre_ratings) {
          let ratings = Object.entries(response.data.genre_ratings).sort(([k1, v1], [k2, v2]) => {
            return v2.averageRating - v1.averageRating;
          });

          setGenres(ratings);
        }
      });
    }, config.POLLING_RATE);
    setPolling(poll);
  } 

  let header = <tr>
    <th>Genre</th>
    <th>Average Rating</th>
    <th>Number of Ratings</th>
  </tr>;

  let jsx = [];

  Object.entries(genreState).forEach(([_, [key, value]]) => {
    jsx.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{Math.round(value.averageRating * 100) / 100}</td>
        <td>{value.numRatings}</td>
      </tr>
    );
  });

  return (
    <div className={'PopularGenres'}>
      <h1>Genres by rating</h1>
      <table className={'resultsTable'}>
        {header}
        {jsx}
      </table>
    </div>
  );
};

export default PopularGenres;
