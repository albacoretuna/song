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
import Gallery from './Gallery';
import HeroImg from './images/yousician-hero-mobile.png';

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

const App: FunctionComponent = () => {
  interface IDataState {
    songs: Song[];
    loading: boolean;
    error: any;
  }

  interface IFavoritesState extends Array<Favorite> {}

  const initialData = { songs: [], loading: true, error: null };

  // main hook that keeps tree data coming from the api
  const [data, setData] = useState<IDataState>(initialData);

  const [favorites, setFavorites] = useState<IFavoritesState>([]);

  // hook for the search
  const [searchText, setSearchText] = useState('');

  // read tree data from api and put it into state
  const fetchDataAndSetState = () => {
    const songsUrl = 'http://localhost:3004/songs';

    axios
      .get(songsUrl)
      .then(({ data }) => {
        // put response in state
        setData({ songs: data, error: null, loading: false });
      })
      .catch(error => {
        setData({ songs: [], error: error, loading: false });
      });
  };

  const fetchFavorites = () => {
    const favoritesUrl = 'http://localhost:3004/favorites';

    axios
      .get(favoritesUrl)
      .then(({ data }) => {
        // put response in state
        setFavorites(data);
      })
      .catch(error => {
        // TODO handle the error
      });
  };

  useEffect(() => {
    fetchDataAndSetState();
    fetchFavorites();
  }, []);

  return (
    <AppWrapper>
      <GlobalStyle />
      {/* search and controls */}
      <Hero>
        <Heading>NEW SONGS DELIVERED EVERY WEEK</Heading>
        <SubHeading>
          Here are the most recent additions to the Yousician App. Start playing
          today!
        </SubHeading>
        <Search setSearchText={setSearchText} />
      </Hero>
      {/* loading indicator */}
      {data.loading && <p>Loading...</p>}

      {/* error handling */}
      {data.error && (
        <p>
          Failed to load tree data, check dev console{' '}
          {console.error(data.error)}
        </p>
      )}

      {/* main component */}
      <Gallery
        songs={data.songs}
        searchText={searchText}
        favorites={favorites}
      />
    </AppWrapper>
  );
};

export default App;
