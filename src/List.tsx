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
  songs: Song[];
  favorites: Favorite[];
  fetchMoreSongs: (next: boolean, searchKeyword?: string, start?: number, end?: number) => void;
  setSongs: Dispatch<SetStateAction<Song[]>>;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  isFetching: boolean
};


// is this song id in favorites list?
const isFavorite = (songId: string, favorites: Favorite[]): boolean => {
  return (
    favorites.find((favorite: Favorite) => favorite.songId === songId) !==
    undefined
  );
};

// gets the initial list
// loads more, adds them to those and calls useState? :)
// TODO
const List: FunctionComponent<ListProps> = ({
  songs,
  favorites,
  fetchMoreSongs,
  setSongs,
  setIsFetching,
  isFetching
}) => {


  const handleScroll = () => {
    const isNotEndOfPageYet = window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight;
    if (isNotEndOfPageYet) return;
    setIsFetching(true);

    fetchMoreSongs(true, undefined);
    console.log('load more now!');
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <ListWrapper>
      {songs.map((song: Song, index: number) => (
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
