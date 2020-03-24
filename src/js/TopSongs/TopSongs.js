import React, {useState} from 'react';
import axios from 'axios';
import config from '../../../config/config.js';

const TopSongs = (props) => {
  const [songState, setSongs] = useState({});
  const [polling, setPolling] = useState(false);

  if(!polling) {
    const poll = setInterval(() => {
      axios.get('http://localhost:3000/songs').then(response => {
        if(response.data && response.data.top_songs) {
          setSongs(response.data.top_songs);
        }
      });
    }, config.POLLING_RATE);
    setPolling(poll);
  } 

  let header = <tr>
    <th>Song</th>
    <th>Average Rating</th>
    <th>Number of Ratings</th>
  </tr>;

  let jsx = [];

  if(songState.songList) {
    songState.songList.forEach(song => {
      if(song) {
        jsx.push(
          <tr key={song.name}>
            <td>{song.name}</td>
            <td>{Math.round(song.averageRating * 100) / 100}</td>
            <td>{song.numRatings}</td>
          </tr>
        ); 
      }
    });
  }

  return (
    <div className={'TopSongs'}>
      <h1>Top 50 songs by rating</h1>
      <table className={'resultsTable'}>
        {header}
        {jsx}
      </table>
    </div>
  );
};

export default TopSongs;
