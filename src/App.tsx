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
export type Tree = {
  image: string;
  name: string;
  species_name: string;
};

// sorting order
export type SortBy = 'AZ' | 'ZA';


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
const Footer = styled.footer`
  min-height: 200px;
  margin: 100px auto 30px;
  padding: 10px;
  display: flex;
  align-items: flex-end;
  color: rgb(103, 100, 100);
`;

const Latency = styled.p`
  padding: 10px;
  color: rgb(103, 100, 100);
`;
const AppWrapper = styled.div`
  height: 100%;
  font-family: 'Helvetica', 'Arial', 'sans-serif';
`;

const App: FunctionComponent = () => {
  interface IDataState {
    trees: Tree[];
    loading: boolean;
    error: any;
  }
  const initialData = { trees: [], loading: true, error: null };
  // main hook that keeps tree data coming from the api
  const [data, setData] = useState<IDataState>(initialData);

  // hook for the search
  const [searchText, setSearchText] = useState('');

  // hook for toggling all photos
  const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false);

  // hook for keeping latency duration
  const [latency, setLatency] = useState(0);

  // hook for sorting
  const [sortBy, setSortBy] = useState<SortBy>('AZ');

  // read tree data from api and put it into state
  const fetchDataAndSetState = () => {
    const treeDataUrl =
      'https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json';
    const startTimestamp = Date.now();
    axios
      .get(treeDataUrl)
      .then(({ data }) => {
        // track how long the api call took
        setLatency(Date.now() - startTimestamp);

        // put response in state
        setData({ ...data, error: null, loading: false });
      })
      .catch(error => {
        setData({ trees: [], error: error, loading: false });
      });
  };

  useEffect(() => {
    fetchDataAndSetState();
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
          showAllPhotos={showAllPhotos}
          sortBy={sortBy}
        />

        <Footer />
      </AppWrapper>
  );
};

export default App;
