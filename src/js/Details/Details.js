import React from 'react';
import PopularGenres from '../PopularGenres/PopularGenres.js';

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'Details'}>
        <PopularGenres />
      </div>
    );
  }
}

export default Details;