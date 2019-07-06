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
`;

const Hero = styled.header`
  text-align: center;
  color: white;
  background: red;
  background: url(${HeroImg}) no-repeat;
  background-size: cover;
  padding: 20px;
`;

const AppWrapper = styled.div`
  height: 100%;
  font-family: 'Helvetica', 'Arial', 'sans-serif';
`;

const App: FunctionComponent = () => {
  interface IDataState {
    trees: Song[];
    loading: boolean;
    error: any;
  }

  interface IFavoritesState {
    favorites: Favorite[];
  }
  const initialData = { trees: [], loading: true, error: null };
  const initialFavorite = { favorites: [{id: '', songId: ''}] };

  // main hook that keeps tree data coming from the api
  const [data, setData] = useState<IDataState>(initialData);

  const [favorites, setFavorites] = useState<IFavoritesState>(initialFavorite);

  // hook for the search
  const [searchText, setSearchText] = useState('');

  // read tree data from api and put it into state
  const fetchDataAndSetState = () => {
    const songsUrl = 'http://localhost:3004/songs';

    axios
      .get(songsUrl)
      .then(({ data }) => {
        console.log(data);
        // put response in state
        setData({ trees: data, error: null, loading: false });
      })
      .catch(error => {
        setData({ trees: [], error: error, loading: false });
      });
  };

  const fetchFavorites = () => {
    const favoritesUrl = 'http://localhost:3004/favorites';

    axios
      .get(favoritesUrl)
      .then(({ data }) => {
        // put response in state
        setFavorites({favorites: data});
        console.log('oho favorites set', favorites, 'data: ', data);
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
        <h1>New songs delivered every week</h1>
        <h2>
          Here are the most recent addittions to the Yousician App. Start
          playing today
        </h2>
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
        trees={data.trees}
        searchText={searchText}
        favorites={favorites.favorites}
      />
    </AppWrapper>
  );
};

export default App;
