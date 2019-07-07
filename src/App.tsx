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

// a single tree info in the api response
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
  interface IDataState {
    songs: Song[];
    error: any;
  }

  interface IFavoritesState extends Array<Favorite> {}

  const initialData = { songs: [], error: null };

  const [loading, setLoading] = useState(true);

  // main hook that keeps tree data coming from the api
  const [data, setData] = useState<IDataState>(initialData);

  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  // read tree data from api and put it into state
  const fetchData = (searchTerm?: string) => {
    setLoading(true);
    const songsUrl = `http://localhost:3004/songs?_start=1&_end=11&search_like=${searchTerm}`;
    const songs = axios.get(songsUrl);

    const favoritesUrl = 'http://localhost:3004/favorites';

    const favorites = axios.get(favoritesUrl);

    Promise.all([songs, favorites]).then(([songs, favorites]) => {
      setLoading(false);
      setData({ songs: songs.data, error: null });
      setFavorites(favorites.data);
    });
  };

  useEffect(() => {
    fetchData('');
  }, []);

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
        <Search fetchData={fetchData} />
      </Hero>
      {/* loading indicator */}
      {loading ? (
        <LoadingSpinner>
          <LoadingText>Loading...</LoadingText>
          <img src={SpinnerSvg} alt="Loading" />
        </LoadingSpinner>
      ) : (
        <List songs={data.songs} favorites={favorites} />
      )}

      {/* error handling */}
      {data.error && (
        <p>
          Failed to load tree data, check dev console{' '}
          {console.error(data.error)}
        </p>
      )}
    </AppWrapper>
  );
};

export default App;
