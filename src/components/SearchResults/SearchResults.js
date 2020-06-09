import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return(
      <div className="SearchResults">
        <h2 className="SearchResults-title">Results</h2>
        <TrackList 
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
};

export default SearchResults;