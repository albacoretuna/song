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
import List from './List';
import GlobalStyle from './GlobalStyle';
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
  species_name: string;
  level: number;
};

export type Favorite = {
  id: string;
  songId: string;
};

const App: FunctionComponent = () => {
  interface ISongsState extends Array<Song> {}
  interface IFavoritesState extends Array<Favorite> {}

  const [isLoading, setIsLading] = useState(true);

  // main hook that keeps song data coming from the api
  const [loadedSongs, setLoadedSongs] = useState<ISongsState>([]);

  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  const [isFetching, setIsFetching] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [lastSong, setLastSong] = useState(20);

  const [totalSongsCount, setTotalSongsCount] = useState(100);

  const baseApiUrl = 'http://localhost:3004/';

  // how many songs to load each time
  const pageSize = 20;

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
    setIsLading(true);

    const songs = axios.get(getSongsUrl(baseApiUrl, start, end, searchTerm));

    const favoritesUrl = `${baseApiUrl}favorites`;

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setIsLading(false);
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

    setIsLading(true);
    setLastSong(prevLastSong => prevLastSong + 20);

    const songsUrl = `${baseApiUrl}songs?${start ? '_start=' + start : ''}&${
      end ? '_end=' + end : ''
    }&search_like=${searchTerm}`;

    axios.get(songsUrl).then(({ data }) => {
      setIsLading(false);

      // add the fetched songs to the previously loaded songs
      setLoadedSongs(prevSongs => [...prevSongs, ...data]);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    // The initial loading of songs and favorites
    fetchSongs('');
  }, []);

  useEffect(
    // handle fetch on scroll for songs
    () => {
      if (!isFetching) return;

      fetchMoreSongs('');
    },
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

      {/* The main song list*/}
      <List
        loadedSongs={loadedSongs}
        favorites={favorites}
        setIsFetching={setIsFetching}
      />

      {/* spinner */}
      {isLoading && <LoadingSpinner />}
    </AppWrapper>
  );
};

export default App;
