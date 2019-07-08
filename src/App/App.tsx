/**
 * App.tsx
 * This is the main file holding most of the logic
 * so start here and check out individual components that this one imports
 */

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';

// ours
import Search from './Search';
import List from './List/List';
import Filter from './Filter/Filter';
import GlobalStyle from '../style/GlobalStyle';
import {
  Hero,
  Heading,
  SubHeading,
  AppWrapper,
  LoadingSpinner
} from './App.Components';

// a single song info in the api response
export type Song = {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: number;
};
interface ISongsState extends Array<Song> {}

export type Favorite = {
  id: string;
  songId: string;
};
interface IFavoritesState extends Array<Favorite> {}

const baseApiUrl = 'http://localhost:3004/';

export const favoritesUrl = `${baseApiUrl}favorites`;

// how many songs to load each time
const pageSize = 20;

const App: FunctionComponent = () => {
  // hooks keeping the state
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSongs, setLoadedSongs] = useState<ISongsState>([]);
  const [favorites, setFavorites] = useState<IFavoritesState>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastSong, setLastSong] = useState(pageSize);
  const [totalSongsCount, setTotalSongsCount] = useState(100);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  // insert pramas to the url for fetching songs
  const getSongsUrl = (
    baseApiUrl: string,
    start: number,
    end: number,
    searchTerm?: string
  ) =>
    `${baseApiUrl}songs?${start ? '_start=' + start : ''}&${
      end ? '_end=' + end : ''
    }&${searchTerm ? 'search_like=' + searchTerm : ''}`;

  // read songs from api and put it into state, for first load
  const fetchSongs = (
    searchTerm?: string,
    start: number = 0,
    end: number = pageSize
  ) => {
    setIsLoading(true);

    const songs = axios.get(getSongsUrl(baseApiUrl, start, end, searchTerm));

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setIsLoading(false);
      setLoadedSongs(songs.data);
      setTotalSongsCount(songs.headers['x-total-count']);
      setFavorites(favorites.data);
    });
  };

  // For infinite scrolling
  const fetchMoreSongs = (
    searchTerm?: string,
    start: number = 0,
    end: number = pageSize
  ) => {
    if (!hasMore) {
      return;
    }

    start = lastSong;
    end = lastSong + pageSize;

    if (end > totalSongsCount) {
      end = totalSongsCount;
      setHasMore(false);
    }

    setIsLoading(true);
    setLastSong(prevLastSong => prevLastSong + 20);

    const songsUrl = `${baseApiUrl}songs?${start ? '_start=' + start : ''}&${
      end ? '_end=' + end : ''
    }&search_like=${searchTerm}`;

    axios.get(songsUrl).then(({ data }) => {
      setIsLoading(false);

      // add the fetched songs to the previously loaded songs
      setLoadedSongs(prevSongs => [...prevSongs, ...data]);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    // The initial loading of songs and favorites
    fetchSongs();
    // eslint-disable-next-line
  }, []);

  useEffect(
    // handle fetch on scroll for songs
    () => {
      if (!isFetching) return;
      //TODO pass the search keyword here
      fetchMoreSongs('');
    },
    // eslint-disable-next-line
    [isFetching]
  );

  return (
    <AppWrapper>
      <GlobalStyle />

      {/* Search and hero */}
      <Hero>
        <Heading>NEW SONGS DELIVERED EVERY WEEK</Heading>
        <SubHeading>
          Here are the most recent additions to the Yousician App. Start playing
          today!
        </SubHeading>
        <Search fetchSongs={fetchSongs} />
      </Hero>

      {/* Level filtering */}
      <Filter
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
      />

      {/* The main song list*/}
      <List
        loadedSongs={loadedSongs}
        favorites={favorites}
        setFavorites={setFavorites}
        setIsFetching={setIsFetching}
      />

      {/* spinner */}
      {isLoading && <LoadingSpinner />}
    </AppWrapper>
  );
};

export default App;
