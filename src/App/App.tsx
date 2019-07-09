/**
 * App.tsx
 * This is the main file holding most of the logic
 * so start here and check out individual components that this one imports
 */

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
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
  LoadingSpinner,
  NoSongsFound
} from './App.Components';
import { getSongs, getFavorites, prepareSongsUrl } from './api';

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

// how many songs to load each time
const pageSize = 50;

const App: FunctionComponent = () => {
  // All kinds of hooks!
  //
  // hook for loading spinner
  const [isLoading, setIsLoading] = useState(true);

  // data store for songs and favorites
  //
  const [loadedSongs, setLoadedSongs] = useState<ISongsState>([]);
  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  // infinite scrolling
  //
  const [isFetching, setIsFetching] = useState(false);
  // is there songs to fetch from Api more?
  const [hasMore, setHasMore] = useState(true);
  const [nextSong, setNextSong] = useState(pageSize);
  const [totalSongsCount, setTotalSongsCount] = useState(pageSize);
  //----------

  // level filtering
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  // for search
  const [searchKeyword, setSearchKeyword] = useState('');

  // read songs from api and put it into state, for first load
  const fetchSongs = (searchTerm?: string, levels?: number[]) => {
    let start = 0;
    setIsLoading(true);
    const songs = getSongs(
      prepareSongsUrl(start, pageSize, searchTerm, selectedLevels)
    );

    const favorites = getFavorites();
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setIsLoading(false);
      setLoadedSongs(songs.data);
      // get total number of songs database holds
      setTotalSongsCount(songs.headers['x-total-count']);
      setFavorites(favorites.data);
      setNextSong(start + pageSize);
    });
  };

  // Infinite scrolling
  const fetchMoreSongs = (searchTerm?: string, levels?: number[]) => {
    if (!hasMore) return;

    if (nextSong + pageSize > totalSongsCount) {
      setHasMore(false);
    }

    setIsLoading(true);

    setNextSong(prevNextSong =>
      Math.min(prevNextSong + pageSize, totalSongsCount)
    );

    getSongs(
      prepareSongsUrl(nextSong, pageSize, searchTerm, selectedLevels)
    ).then(({ data }) => {
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
    // handle fetching songs on scroll
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
      {loadedSongs.length === 0 && !isLoading
          ?<NoSongsFound>We found no songs, search again with different words</NoSongsFound>
          : <List
        loadedSongs={uniqBy(loadedSongs, 'id')}
        favorites={favorites}
        setFavorites={setFavorites}
        setIsFetching={setIsFetching}
      />
      }

      {/* spinner */}
      {isLoading && <LoadingSpinner />}
    </AppWrapper>
  );
};

export default App;
