// libs
import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

// ours
import { Song, Favorite } from './App';
import Card from './Card';

const ListWrapper = styled.ul`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  margin: 0;
`;

// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type ListProps = {
  loadedSongs: Song[];
  favorites: Favorite[];
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
  setIsFetching,
}) => {


  const handleScroll = () => {
    const isNotEndOfPageYet = window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight;
    if (isNotEndOfPageYet) return;

    setIsFetching(true);

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <ListWrapper>
      {loadedSongs.map((song: Song, index: number) => (
        <Card
          song={song}
          key={song.id}
          index={index}
          isFavorite={isFavorite(song.id, favorites)}
        />
      ))}
    </ListWrapper>
  );
};

export default List;
