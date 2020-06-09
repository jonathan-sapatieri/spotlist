import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };

    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term)
    .then((searchResults) => {
      this.setState({searchResults: searchResults});
    }); 
  }

  updatePlaylistName(playlistName) {
    this.setState({playlistName: playlistName});
  }

  addTrack(newTrack) {
    const playlistTracks = this.state.playlistTracks;
    if(playlistTracks.find(savedTrack => savedTrack.id === newTrack.id)) {
      return;
    };
    playlistTracks.push(newTrack);
    this.setState({ playlistTracks: playlistTracks });
  }

  removeTrack(savedTrack) {
    const playlistTracks = this.state.playlistTracks.filter(
      track => track.id !== savedTrack.id
    );
    this.setState({playlistTracks: playlistTracks});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris)
    .then(() => {
      this.setState({ 
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  render() {
    return(
      <div className="App">
      <h1 className="App-title">Spotlist</h1>
        <SearchBar 
          onSearch={this.search}
        />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist 
            playlistName={this.state.playlistName} 
            tracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName} 
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;