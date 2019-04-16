/* eslint-disable no-console */
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQBewOE_BIt7C6xFDkAQo717Y6zAfmGUsKfi67uA6Y-annlfOl9JB2_oVBJb-VhJcrzpO-0U3wHLXkapUMrXOcyt5CHXWJelpHMT24xqlwvthEmYStywUho4OUWg47j2llhQhNA3EXrpMP1nFZHxKxbX_L8DbfujMy7lLQ',
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
