import {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlayLists,
} from './search';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from './album';

import { API_URL } from './config';

export default class SpotifyWrapper {
  constructor(options = {}) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }
}
