/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe.only('Album', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.be.a('function');
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.be.a('function');
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.be.a('function');
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');
    });

    it('should call fetch with the correct URL 2', () => {
      getAlbum('2BTZIqw0ntH9MvilQ3ewNY');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY');
    });

    it('should return the correct data from Promise', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      album.then(data => expect(data).to.be.eql({ album: 'name' }));
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbums('4aawyAB9vmqN3uQ7FjRGTy', '2BTZIqw0ntH9MvilQ3ewNY');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,2BTZIqw0ntH9MvilQ3ewNY');
    });

    it('should call fetch with the correct URL 2', () => {
      getAlbums('2BTZIqw0ntH9MvilQ3ewNY', '84da9d4a89qqQADA64554');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=2BTZIqw0ntH9MvilQ3ewNY,84da9d4a89qqQADA64554');
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should call fetch with the correct URL 2', () => {
      getAlbumTracks('2BTZIqw0ntH9MvilQ3ewNY');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2BTZIqw0ntH9MvilQ3ewNY/tracks');
    });
  });
});
