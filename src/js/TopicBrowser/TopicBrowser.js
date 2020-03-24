import React from 'react';
import axios from 'axios';
import { Button } from "shards-react";
import TopicItem from './TopicItem.js';

class TopicBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/topics').then(topics => {
      this.setState({topics: topics.data});
    });
  }

  renderTopics(topics) {
    let topicJSX = [];

    topics.forEach(topic => {
      topicJSX.push(<TopicItem topicName={topic} key={topic} />)
    });

    return topicJSX;
  }

  render() {
    return (
      <div className={'TopicBrowser'}>
        <h1>Topics</h1>
        {this.renderTopics(this.state.topics)}
      </div>
    );
  }
}

export default TopicBrowser;