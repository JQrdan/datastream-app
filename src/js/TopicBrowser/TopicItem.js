import React from 'react';
import PropTypes from 'prop-types';

class TopicItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${this.props.active ? 'active ' : ''}TopicItem`}>
        <p className={'TopicName'}>{this.props.topicName}</p>
        <p className={'TopicOffset'}>Latest offset: {this.props.topicOffset}</p>
      </div>
    );
  }
}

TopicItem.propTypes = {
    topicName: PropTypes.string,
    topicOffset: PropTypes.number,
    active: PropTypes.bool
}

export default TopicItem;