import React from 'react';
import TopicBrowser from './TopicBrowser/TopicBrowser.js';

import '../scss/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import PopularGenres from './PopularGenres/PopularGenres.js';
import TopSongs from './TopSongs/TopSongs.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'App'}>
        <TopicBrowser />
        <PopularGenres />
        <TopSongs />
      </div>
    );
  }
}

export default App;