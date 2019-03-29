export const search = (query, type) => {
  try {
    return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
      .then(data => data.json())
      .catch(err => err);
  } catch (error) {
    return error;
  }
};

export const searchArtists = () => {};
export const searchTracks = () => {};
export const searchPlayLists = () => {};
