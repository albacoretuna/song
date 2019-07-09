// prepares the url for fetching songs
const prepareSongsUrl = (
  baseApiUrl: string,
  start: number,
  pageSize: number,
  searchTerm?: string,
  levels?: number[],
) => {
  return `${baseApiUrl}songs?${
    start !== undefined ? '_start=' + start : ''
  }&${'_limit=' + pageSize}&${searchTerm ? 'search_like=' + searchTerm : ''}${
    levels && levels.length > 0 ? '&level=' + levels.join('&level=') : ''
  }`;
};


const baseApiUrl = 'http://localhost:3004/';
const favoritesUrl = `${baseApiUrl}favorites`;

export {prepareSongsUrl, baseApiUrl, favoritesUrl}
