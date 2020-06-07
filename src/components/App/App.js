import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const hardSearchTracks = [
  {
    id: 1,
    name: "Shadow of the day",
    album: "Minutes to Midnight",
    artist: "Linkin Park",
  },
  {
    id: 2,
    name: "It's my life",
    album: "Crush",
    artist: "Bon Jovi",
  },
];

const hardNewTracks = [
  {
    id: 3,
    name: "Dream on",
    album: "Aerosmith",
    artist: "Aerosmith",
  },
]

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: hardSearchTracks,
      playlistName: "",
      playlistTracks: hardNewTracks,
    };

    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    alert('Searching... ' + term)
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
    alert('saving');
  }

  render() {
    return(
      <div>
        <h1>Spot<span className="highlight">list</span></h1>
        <div className="App">
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
      </div>
    );
  }
}

export default App;