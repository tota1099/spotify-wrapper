/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.be.a('function');
    });

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.be.a('function');
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.be.a('function');
    });

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.be.a('function');
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
