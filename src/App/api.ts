// All things related to talking to backend
import axios from 'axios';

const baseApiUrl = 'http://localhost:3004/';
const favoritesUrl = `${baseApiUrl}favorites`;

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000
});

// prepares the url for fetching songs
const prepareSongsUrl = (
  start: number,
  pageSize: number,
  searchTerm?: string,
  levels?: number[]
) => {
  return `songs?${start !== undefined ? '_start=' + start : ''}&${'_limit=' +
    pageSize}&${searchTerm ? 'search_like=' + searchTerm : ''}${
    levels && levels.length > 0 ? '&level=' + levels.join('&level=') : ''
  }`;
};

const removeSongFromFavorites = (favoriteId: string) => {
  return axiosInstance.delete(favoritesUrl + '/' + favoriteId);
};
type addSongToFavoritesPayload = {
  songId: string
}
const addSongToFavorites = (songId: addSongToFavoritesPayload) => {
  return axiosInstance.post(favoritesUrl, { songId });
};

const getSongs = (url: string) => axiosInstance.get(url);
const getFavorites = () => axiosInstance.get(favoritesUrl);

export {
  getSongs,
  getFavorites,
  prepareSongsUrl,
  addSongToFavorites,
  removeSongFromFavorites
};
