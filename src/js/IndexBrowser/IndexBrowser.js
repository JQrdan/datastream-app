import React from 'react';
import axios from 'axios';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  FormInput
} from "shards-react";

const SEARCH_FOR = {
  ALBUMS: 'Album',
  ARTISTS: 'Artist',
  GENRES: 'Genre'
};

export default class IndexBrowser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchingFor: SEARCH_FOR.ARTISTS,
      validInputs: {
        minRating : true,
        maxRating: true,
        minRatingCount: true,
        maxRatingCount: true
      },
      page: 0,
      pageSize: 50,
      body: []
    };

    this.toggle = this.toggle.bind(this);
    this.setSearchFor = this.setSearchFor.bind(this);
    this.validate = this.validate.bind(this);
    this.search = this.search.bind(this);
    this.parseResult = this.parseResult.bind(this);
    this.parseArtists = this.parseArtists.bind(this);
    this.parseAlbums = this.parseAlbums.bind(this);
    this.parseGenres = this.parseGenres.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  }

  setSearchFor(searchFor) {
    this.setState({
      searchingFor: searchFor
    });
  }

  renderSearchDropdown() {
    const dropdownItems = [];
    Object.values(SEARCH_FOR).forEach(searchFor => {
      dropdownItems.push(<DropdownItem onClick={() => this.setSearchFor(searchFor)}>{searchFor}</DropdownItem>)
    });

    console.log(dropdownItems);

    return (
      <div className={'indexSearchSelection controlGroup'}>
        <p>Search for:</p>
        <Dropdown open={this.state.open} toggle={this.toggle} group>
          <Button>{this.state.searchingFor}</Button>
          <DropdownToggle split />
          <DropdownMenu>
            {dropdownItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }

  renderSearchControls() {
    return (
      <div className={'controls'}>
        {this.renderSearchDropdown()}
        <div className={'controlGroup'}>
          <p>Rating Filter</p>
          <FormInput invalid={!this.state.validInputs.minRating} placeholder="Minimum Rating" id={'minRating'}/>
          <FormInput invalid={!this.state.validInputs.maxRating} placeholder="Maximum Rating" id={'maxRating'}/>
        </div>
        <div className={'controlGroup'}>
          <p>Rating Count Filter</p>
          <FormInput invalid={!this.state.validInputs.minRatingCount} placeholder="Minimum Rating Count" id={'minRatingCount'}/>
          <FormInput invalid={!this.state.validInputs.maxRatingCount} placeholder="Maximum Rating Count" id={'maxRatingCount'}/>
        </div>
        <Button onClick={this.search}>Search</Button>
      </div>
    );
  }

  validate(minRating, maxRating, minRatingCount, maxRatingCount) {
    let validInputs = {
      minRating: true,
      maxRating: true,
      minRatingCount: true,
      maxRatingCount: true
    };
    let valid = true;

    if(minRating > 5 || minRating < 0 || minRating === "") {
      validInputs.minRating = false;
      valid = false;
    }

    if(maxRating > 5 || maxRating < 0 || maxRating === "") {
      validInputs.maxRating = false;
      valid = false;
    }

    if(maxRatingCount < minRatingCount || maxRatingCount < 0 || maxRatingCount === "") {
      validInputs.maxRatingCount = false;
      valid = false;
    }

    if(minRatingCount < 0 || minRatingCount === "") {
      validInputs.maxRatingCount = false;
      valid = false;
    }

    this.setState({validInputs})

    return valid;
  }

  makeRequest() {
    axios.get(`http://localhost:3000/elastic/${this.state.searchingFor.toLowerCase()}/rating?minRating=${this.state.minRating}&maxRating=${this.state.maxRating}&minRatingCount=${this.state.minRatingCount}&maxRatingCount=${this.state.maxRatingCount}&page=${this.state.page}&pageSize=${this.state.pageSize}`)
    .then(response => {
      this.parseResult(response)
    });
  }
  
  search () {
    const minRating = document.getElementById('minRating').value;
    const maxRating = document.getElementById('maxRating').value;
    const minRatingCount = document.getElementById('minRatingCount').value;
    const maxRatingCount = document.getElementById('maxRatingCount').value;
    const page = 0; // reset page position on new query

    const valid = this.validate(minRating, maxRating, minRatingCount, maxRatingCount);
    
    // put ratings in state so they can be used again for pagination
    this.setState({
      minRating, maxRating, minRatingCount, maxRatingCount, page
    }, () => {
      if(valid) {
        this.makeRequest();
      }
    });
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.makeRequest();
    });
  }

  previousPage() {
    this.setState({
      page: this.state.page - 1
    }, () => {
      this.makeRequest();
    });
  }

  find(id) {
    axios.get(`http://localhost:3000/elastic/${this.state.searchingFor.toLowerCase()}/${id}`)
      .then(response => {
        console.log(response)
      });
  }

  parseResult(result) {
    switch(this.state.searchingFor) {
      case SEARCH_FOR.ALBUMS:
        this.parseAlbums(result.data.body.hits.hits);
        break;
      case SEARCH_FOR.ARTISTS:
        this.parseArtists(result.data.body.hits.hits);
        break;
      case SEARCH_FOR.GENRES:
        this.parseGenres(result.data.body.hits.hits);
        break;
    }
  }

  parseGenres(genres) {
    let jsx = [];

    genres.forEach(record => {
      let genre = record._source;

      jsx.push(
        <div className={'record'}>
          <p>Genre: {genre.name}</p>
          <p>Average rating: {Math.round(genre.averageRating * 100) / 100}</p>
          <p>Ratings: {genre.numRatings}</p>
        </div>
      )
    });

    this.setState({
      body: jsx
    });
  }

  parseArtists(artists) {
    let jsx = [];

    artists.forEach(record => {
      let artist = record._source;

      jsx.push(
        <div onClick={() => this.find(artist.artistID)} className={'record'}>
          <p>Artist ID: {artist.artistID}</p>
          <p>Average rating: {Math.round(artist.averageRating * 100) / 100}</p>
          <p>Ratings: {artist.numRatings}</p>
        </div>
      )
    });

    this.setState({
      body: jsx
    });
  }

  parseAlbums(albums) {
    let jsx = [];

    albums.forEach(record => {
      let album = record._source;

      jsx.push(
        <div onClick={() => this.find(album.albumID)} className={'record'}>
          <p>Album ID: {album.albumID}</p>
          <p>Average rating: {Math.round(album.averageRating * 100) / 100}</p>
          <p>Ratings: {album.numRatings}</p>
        </div>
      )
    });

    this.setState({
      body: jsx
    });
  }

  renderPageButtons() {
    return (
      <div>
        <p>Page: {this.state.page}</p>
        <div>
          <Button onClick={this.previousPage} disabled={this.state.page === 0} className={'prevButton'}>Previous Page</Button>
          <Button onClick={this.nextPage}>Next Page</Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={'IndexBrowser'}>
        {this.renderSearchControls()}
        <div className={'records'}>
          {this.state.body}
        </div>
        {this.renderPageButtons()}
      </div>
    );
  }
}