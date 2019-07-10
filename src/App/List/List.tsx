// libs
import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

// ours
import { Song, Favorite } from '../App';
import Card from './Card/Card';

const ListWrapper = styled.ul`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  margin: 0 auto;

  ${breakpoint('tablet')`
      max-width: 640px;
  `}

  ${breakpoint('desktop')`
      max-width: 900px;
  `}

`;

// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type ListProps = {
  loadedSongs: Song[];
  favorites: Favorite[];
  setFavorites: Dispatch<SetStateAction<Favorite[]>>
  setIsFetching: Dispatch<SetStateAction<boolean>>;
};


// is this song id in favorites list?
const isFavorite = (songId: string, favorites: Favorite[]): boolean => {
  return (
    favorites.find((favorite: Favorite) => favorite.songId === songId) !==
    undefined
  );
};

const List: FunctionComponent<ListProps> = ({
  loadedSongs,
  favorites,
  setFavorites,
  setIsFetching
}) => {
  // infinite scrolling handlers
  const handleScroll = () => {
    const isAtPageBottom = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight;
    if (isAtPageBottom) {
      setIsFetching(true);
    }

  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <ListWrapper data-testid="list-component-songs">
      {loadedSongs.map((song: Song, index: number) => (
        <Card
          song={song}
          key={song.id}
          index={index}
          isFavorite={isFavorite(song.id, favorites)}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ))}
    </ListWrapper>
  );
};

export default List;
