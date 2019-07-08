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
  const [nextSong, setNextSong] = useState(pageSize);
  const [totalSongsCount, setTotalSongsCount] = useState(20);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);

  // insert pramas to the url for fetching songs
  const getSongsUrl = (
    baseApiUrl: string,
    start: number,
    searchTerm?: string,
    levels?: number[]
  ) => {


    return `${baseApiUrl}songs?${start !== undefined ? '_start=' + start : ''}&${
     '_limit=' + pageSize}&${searchTerm ? 'search_like=' + searchTerm : ''}${
      levels && levels.length > 0 ? '&level=' + levels.join('&level=') : ''
    }`;
  }


  //TODO
  // 30 nextSong:  20 hasMore:  true
  // Select 3 filters, it should enable scrolling. But it won't
  //
  //
  //
  //
  //
  // read songs from api and put it into state, for first load
  const fetchSongs = (
    searchTerm?: string,
    start: number = 0,
    levels?: number[]
  ) => {
    setIsLoading(true);
    debugger;
    const songs = axios.get(
      getSongsUrl(baseApiUrl, start, searchTerm, selectedLevels)
    );

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setIsLoading(false);
      setLoadedSongs(songs.data);
      setTotalSongsCount(songs.headers['x-total-count']);
      console.log(songs.headers['x-total-count']);
      setFavorites(favorites.data);
      setNextSong(start + pageSize);
    });
  };

  // For infinite scrolling
  const fetchMoreSongs = (
    searchTerm?: string,
    start: number = 0,
    levels?: number[]
  ) => {
    if(!hasMore) return;

    start = nextSong;
    let end = nextSong + pageSize;

    if (end > totalSongsCount) {
      setHasMore(false);
    }

    setIsLoading(true);
    setNextSong(prevNextSong => Math.min(prevNextSong + 20, totalSongsCount));

    axios
      .get(getSongsUrl(baseApiUrl, start, searchTerm, selectedLevels))
      .then(({ data }) => {
        setIsLoading(false);

        // add the fetched songs to the previously loaded songs
        setLoadedSongs(prevSongs => [...prevSongs, ...data]);
        setIsFetching(false);



      });
  };


  useEffect(
    () => {
      console.log('fetchSongs');
      // The initial loading of songs and favorites
      fetchSongs('', undefined, selectedLevels);
      // eslint-disable-next-line
    },
    [selectedLevels]
  );

  useEffect(
    () => {
      console.log('totalSongsCount changed: ', totalSongsCount, 'nextSong: ',  nextSong, 'hasMore: ', hasMore);

      if(nextSong >= totalSongsCount) {
        console.log('has more turned to false');
        setHasMore(false);
        setNextSong(totalSongsCount)
      } else {
        console.log('has more turned to true');
        setHasMore(true);
      }
    },
    [totalSongsCount, nextSong, hasMore]
  );

  useEffect(
    // handle fetch on scroll for songs
    () => {
      console.log('came to fetchSongs: ', selectedLevels);
      if (!isFetching) return;
      //TODO pass the search keyword here
      fetchMoreSongs('', undefined, selectedLevels);
    },
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
