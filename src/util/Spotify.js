const clientId      = "e9dbde275cbf4de3964c6f674e6d59f3",
      redirectUri   = "http://localhost:3000",
      baseApiUrl    = "https://api.spotify.com/v1";

const Spotify = {
  accessToken: "",
  
  getAccessToken() {  
    if(this.acessToken) {
      return this.acessToken;
    };

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      this.acessToken =  accessTokenMatch[1];
      const expirationTime =  expiresInMatch[1];

      window.setTimeout(() => this.acessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return this.acessToken;

    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    };
  },

  async search(term) {
    try {
      let response = await fetch(`${baseApiUrl}/search?type=track&q=${term}`, 
        { 
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getAccessToken(),
          }
        }
      );
      
      response = await response.json();

      return response.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });   
    } catch (error) {
      console.log(error.message);
      return [];
    };
  },
};

module.exports = Spotify;