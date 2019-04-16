/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.be.a('function');
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.be.a('function');
    });

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.be.a('function');
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.album.getAlbum('2BTZIqw0ntH9MvilQ3ewNY');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY');
    });

    it('should return the correct data from Promise', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      album.then(data => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '2BTZIqw0ntH9MvilQ3ewNY']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,2BTZIqw0ntH9MvilQ3ewNY');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.album.getAlbums(['2BTZIqw0ntH9MvilQ3ewNY', '84da9d4a89qqQADA64554']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=2BTZIqw0ntH9MvilQ3ewNY,84da9d4a89qqQADA64554');
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should call fetch with the correct URL 2', () => {
      spotify.album.getTracks('2BTZIqw0ntH9MvilQ3ewNY');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY/tracks');
    });
  });
});
