import React from 'react';
import InstanceSidebar from './InstanceSidebar/InstanceSidebar.js';
import TopicBrowser from './TopicBrowser/TopicBrowser.js';
import Details from './Details/Details.js';

import '../scss/index.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'App'}>
        <InstanceSidebar />
        <TopicBrowser />
        <Details />
      </div>
    );
  }
}

export default App;