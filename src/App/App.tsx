/**
 * App.tsx
 * This is the main file holding most of the logic
 * so start here and check out individual components that this one imports
 */

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';

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
const pageSize = 50;

const App: FunctionComponent = () => {
  // All kinds of hooks!
  // hook for loading spinner
  const [isLoading, setIsLoading] = useState(true);

  // data store for songs and favorites
  const [loadedSongs, setLoadedSongs] = useState<ISongsState>([]);
  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  // for infinite scrolling
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextSong, setNextSong] = useState(pageSize);
  const [totalSongsCount, setTotalSongsCount] = useState(pageSize);

  // for level filtering
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  // for search
  const [searchKeyword, setSearchKeyword] = useState('');

  // insert pramas to the url for fetching songs
  const getSongsUrl = (
    baseApiUrl: string,
    start: number,
    searchTerm?: string,
    levels?: number[]
  ) => {
    return `${baseApiUrl}songs?${
      start !== undefined ? '_start=' + start : ''
    }&${'_limit=' + pageSize}&${searchTerm ? 'search_like=' + searchTerm : ''}${
      levels && levels.length > 0 ? '&level=' + levels.join('&level=') : ''
    }`;
  };

  // read songs from api and put it into state, for first load
  const fetchSongs = (
    searchTerm?: string,
    levels?: number[]
  ) => {
    let start = 0;
    setIsLoading(true);
    const songs = axios.get(
      getSongsUrl(baseApiUrl, start, searchTerm, selectedLevels)
    );

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setIsLoading(false);
      setLoadedSongs(songs.data);
      setTotalSongsCount(songs.headers['x-total-count']);
      setFavorites(favorites.data);
      setNextSong(start + pageSize);
    });
  };

  // Infinite scrolling
  const fetchMoreSongs = (
    searchTerm?: string,
    levels?: number[]
  ) => {
    if (!hasMore) return;

    if (nextSong + pageSize > totalSongsCount) {
      setHasMore(false);
    }

    setIsLoading(true);

    setNextSong(prevNextSong =>
      Math.min(prevNextSong + pageSize, totalSongsCount)
    );

    axios
      .get(getSongsUrl(baseApiUrl, nextSong, searchTerm, selectedLevels))
      .then(({ data }) => {
        setIsLoading(false);

        // add the fetched songs to the previously loaded songs
        setLoadedSongs(prevSongs => [...prevSongs, ...data]);
        setIsFetching(false);
      });
  };

  useEffect(
    () => {
      // The initial loading of songs and favorites
      fetchSongs(searchKeyword, selectedLevels);
    },
    // eslint-disable-next-line
    [selectedLevels]
  );

  useEffect(
    () => {
      if (nextSong >= totalSongsCount) {
        setHasMore(false);
        setNextSong(totalSongsCount);
      } else {
        setHasMore(true);
      }
    },
    // eslint-disable-next-line
    [totalSongsCount, nextSong, hasMore]
  );

  useEffect(
    // handle fetch on scroll for songs
    () => {
      if (!isFetching) return;
      fetchMoreSongs(searchKeyword, selectedLevels);
    },
    // eslint-disable-next-line
    [isFetching, selectedLevels]
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
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          fetchSongs={fetchSongs}
        />
      </Hero>

      {/* Level filtering */}
      <Filter
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
      />

      {/* The main song list*/}
      <List
        loadedSongs={uniqBy(loadedSongs, 'id')}
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
