// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { Song, Favorite } from './App';
import Card from './Card';

const GalleryWrapper = styled.ul`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  margin: 0;
`;

type GalleryProps = {
  songs: Song[];
  searchText: string;
  favorites: Favorite[];
};

// is this song id in favorites list?
const isFavorite = (songId: string, favorites: Favorite[]) : boolean  =>  {
  return favorites.find((favorite: Favorite) => favorite.songId === songId) !== undefined;
}

const Gallery: FunctionComponent<GalleryProps> = ({
  songs,
  searchText,
  favorites
}) => (
  <GalleryWrapper>
    {songs
      .map((song: Song, index: number) => (
        <Card
          song={song}
          key={song.id}
          index={index}
          isFavorite={isFavorite(song.id, favorites)}
        />
      ))}
  </GalleryWrapper>
);

export default Gallery;
