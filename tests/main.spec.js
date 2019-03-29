/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search,
  searchArtists,
  searchTracks,
  searchPlayLists,
} from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

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
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fecth function', () => {
      search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('shouldreceive the correct url to fetch', () => {
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
  });
});
