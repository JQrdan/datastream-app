import React from 'react';

import '../scss/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import IndexBrowser from './IndexBrowser/IndexBrowser.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'App'}>
        <IndexBrowser />
      </div>
    );
  }
}

export default App;