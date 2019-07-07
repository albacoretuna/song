/**
 * App.tsx
 * This is the main file holding most of the logic
 * so start here and check out individual components that this one imports
 */

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

// ours
import Search from './Search';
import List from './List';
import HeroImg from './images/yousician-hero-mobile.png';
import SpinnerSvg from './images/audio.svg';

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
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: black;
  }
  * {
    font-family: 'Montserrat', sans-serif;
   }
`;

const Hero = styled.header`
  text-align: center;
  color: white;
  background: red;
  background: url(${HeroImg}) no-repeat;
  background-size: cover;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 900;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 400;
`;

const AppWrapper = styled.div`
  height: 100%;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  color: white;
  padding: 20px;
`;

const LoadingText = styled.p`
  margin: 10px;
  color: white;
`;

const App: FunctionComponent = () => {
  interface ISongsState extends Array<Song> {}
  interface IFavoritesState extends Array<Favorite> {}

  const [loading, setLoading] = useState(true);

  // main hook that keeps song data coming from the api
  const [songs, setSongs] = useState<ISongsState>([]);

  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  const [isFetching, setIsFetching] = useState(false);

  const [lastSong, setLastSong] = useState(20);

  const [totalSongsCount, setTotalSongsCount] = useState(100);

  // read songs from api and put it into state
  const fetchSongs = (
    searchTerm?: string,
    start: number = 1,
    end: number = 10,
  ) => {
    const baseApiUrl = 'http://localhost:3004/';
    setLoading(true);
    const songsUrl = `${baseApiUrl}songs?${start ? '_start=' + start : ''}&${
      end ? '_end=' + end : ''
    }&search_like=${searchTerm}`;
    const songs = axios.get(songsUrl);

    const favoritesUrl = `${baseApiUrl}favorites`;

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setLoading(false);
      setSongs(songs.data);
      console.log(songs.headers);
      setTotalSongsCount(songs.headers['x-total-count'])
      setFavorites(favorites.data);
    });
  };

  // read songs from api and put it into state
  const fetchMoreSongs = (
    next: boolean,
    searchTerm?: string,
    start: number = 1,
    end: number = 10,
  ) => {
    const baseApiUrl = 'http://localhost:3004/';
    if(next) {
      start = lastSong;
    }
    end = Math.max(lastSong + 20, totalSongsCount + 1);
    if(start >= totalSongsCount) return;

    console.log('start: ', start, ' end: ', end, ' totalSongsCount: ', totalSongsCount);
    setLoading(true);
    setLastSong(prevLastSong => prevLastSong+20)
    console.log('lastSong: ', lastSong);
    const songsUrl = `${baseApiUrl}songs?${start ? '_start=' + start : ''}&${
      end ? '_end=' + end : ''
    }&search_like=${searchTerm}`;
    const songs = axios.get(songsUrl);

    const favoritesUrl = `${baseApiUrl}favorites`;

    const favorites = axios.get(favoritesUrl);
    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setLoading(false);
      setSongs(prevSongs => [...prevSongs, ...songs.data]);
      setIsFetching(false);
      setFavorites(favorites.data);
    });
  };

  useEffect(() => {
    fetchSongs('');
  }, [ ]);

  useEffect(() => {
  if (!isFetching) return;
    fetchMoreSongs(true, '');
  }, [isFetching]);

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
      {/* loading indicator */}
        <List
          songs={songs}
          favorites={favorites}
          fetchMoreSongs={fetchMoreSongs}
          setSongs={setSongs}
          setIsFetching={setIsFetching}
          isFetching={isFetching}
        />
      {loading && (
        <LoadingSpinner>
          <LoadingText>Loading...</LoadingText>
          <img src={SpinnerSvg} alt="Loading" />
        </LoadingSpinner>
      )}
    </AppWrapper>
  );
};

export default App;
