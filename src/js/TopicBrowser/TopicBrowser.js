import React from 'react';
import { Button } from "shards-react";
import TopicItem from './TopicItem.js';

class TopicBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'TopicBrowser'}>
        <div className={'createTopicWrapper'}>
          <Button outline pill className={'createTopic'}>Create new Topic</Button>
        </div>

        <TopicItem topicName={'My Topic'} topicOffset={200}/>
        <TopicItem active topicName={'My Topic 2'} topicOffset={15000}/>
        <TopicItem topicName={'My Topic 3'} topicOffset={0}/>
      </div>
    );
  }
}

export default TopicBrowser;