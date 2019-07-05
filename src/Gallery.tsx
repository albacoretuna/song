// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { Song } from './App';
import Card from './Card';

const GalleryWrapper = styled.ul`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  @media only screen and (min-device-width: 667px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2%;
  }
`;

type GalleryProps = {
  trees: Song[];
  searchText: string;
  favorites: Favorite[]
};

const isFavorite = (song) => favorites

const Gallery: FunctionComponent<GalleryProps> = ({
  trees,
  searchText,
  favorites
}) => (
  <GalleryWrapper>
    {trees
      .map((song: Song, index: number) => (
        <Card
          song={song}
          key={index /*TODO in production get unique ids from backend*/}
          index={index}
          isFavorite={}
        />
      ))}
  </GalleryWrapper>
);

export default Gallery;
