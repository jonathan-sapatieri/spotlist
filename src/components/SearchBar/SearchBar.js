import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleSearch() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return(
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button onClick={this.handleSearch} className="SearchButton">
          SEARCH
        </button>
      </div>
    );
  }
};

export default SearchBar;