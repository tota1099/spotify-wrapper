/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  search,
  searchArtists,
  searchTracks,
  searchPlayLists,
} from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(search).to.be.a('function');
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.be.a('function');
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.be.a('function');
    });

    it('should exist the searchPlayLists method', () => {
      expect(searchPlayLists).to.be.a('function');
    });
  });

  describe('Generic Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.resolves({ json: () => {} });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fecth function', () => {
      search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      const album = search('Incubus', 'artist');
      album
        .then(data => expect(data).to.be.equal({ album: 'name' }))
        .catch(err => err);
    });
  });
});
