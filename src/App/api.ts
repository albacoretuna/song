// All things related to talking to backend
import axios from 'axios';

const baseApiUrl = 'http://localhost:3004/';
const favoritesUrl = `${baseApiUrl}favorites`;

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000
});

// credit https://stackoverflow.com/a/9310752
// Without this searching for a "?" would break backend :D
const escapeRegExp = (text: string) =>
  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// prepares the url for fetching songs
const prepareSongsUrl = (
  start: number,
  // how many songs to request each time
  pageSize: number,
  searchTerm?: string,
  // filtering by level
  levels?: number[]
) => {
  return `songs?${start !== undefined ? '_start=' + start : ''}&${'_limit=' +
    pageSize}&${
    searchTerm
      ? 'search_like=' + encodeURIComponent(escapeRegExp(searchTerm))
      : ''
  }${levels && levels.length > 0 ? '&level=' + levels.join('&level=') : ''}`;
};

const removeSongFromFavorites = (favoriteId: string) =>
  axiosInstance.delete(favoritesUrl + '/' + favoriteId);

type addSongToFavoritesPayload = {
  songId: string;
};
const addSongToFavorites = (songId: addSongToFavoritesPayload) =>
  axiosInstance.post(favoritesUrl, { songId });

const getSongs = (url: string) => axiosInstance.get(url);
const getFavorites = () => axiosInstance.get(favoritesUrl);

export {
  getSongs,
  getFavorites,
  prepareSongsUrl,
  addSongToFavorites,
  removeSongFromFavorites
};
