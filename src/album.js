import auth, { API_URL } from './config';
import { toJSON } from './utils';

export const getAlbum = id => fetch(`${API_URL}/albums/${id}`, { headers: auth }).then(toJSON);
export const getAlbums = (...ids) => fetch(`${API_URL}/albums/?ids=${ids.map(id => id)}`, { headers: auth }).then(toJSON);
export const getAlbumTracks = id => fetch(`${API_URL}/albums/${id}/tracks`, { headers: auth }).then(toJSON);
