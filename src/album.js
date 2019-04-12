import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

export const getAlbum = id => fetch(`${API_URL}/albums/${id}`, { headers: HEADERS }).then(toJSON);
export const getAlbums = (...ids) => fetch(`${API_URL}/albums/?ids=${ids.map(id => id)}`, { headers: HEADERS }).then(toJSON);
export const getAlbumTracks = id => fetch(`${API_URL}/albums/${id}/tracks`, { headers: HEADERS }).then(toJSON);
