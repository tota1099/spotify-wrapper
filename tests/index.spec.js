/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { describe, it } from 'mocha';

import SpotifyWrapper from '../src/index';

describe('SpotifyWrapper Library', () => {
  it('should create and instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper();
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'example.com.br',
    });
    expect(spotify.apiURL).to.be.equal('example.com.br');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper();
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo'
    });
    expect(spotify.token).to.be.equal('foo');
  });

});
