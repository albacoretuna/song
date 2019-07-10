// Card component, showing a song detail

// libs
import React, { useState, FunctionComponent } from 'react';

// ours
import { Song, Favorite } from '../../App';
import { addSongToFavorites, removeSongFromFavorites } from '../../api';
import LevelIndicator from '../../lib/LevelIndicator';

import {
  FavoriteButtonElement,
  SubHeading,
  Heading,
  ImgWithFallback,
  ListItem,
  TitleColumn,
  FavoriteIcon,
  FavoriteBorderIcon
} from './Card.Components';

// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type CardProps = {
  song: Song;
  index: number;
  isFavorite: boolean;
  setFavorites: Dispatch<SetStateAction<Favorite[]>>;
  favorites: Favorite[];
};

const Card: FunctionComponent<CardProps> = ({
  song,
  index,
  isFavorite,
  setFavorites,
  favorites
}) => {
  const [favIsLoading, setFavIsLoading] = useState(false);
  // toggle favorite and not favorite
  const handleFavoriteButton = (songId: string, isFavorite: boolean) => {
    setFavIsLoading(true);

    // it's either faving or un-faving
    if (isFavorite) {
      // to un-fave a song
      const favorite = favorites.find(
        (favorite: Favorite) => favorite.songId === songId
      );

      if (!favorite) return;

        removeSongFromFavorites(favorite.id).then(({ data }) => {
          setFavIsLoading(false);
          // update favorites in state
          setFavorites(favorites =>
            favorites.filter(
              loadedFavorite => favorite.songId !== loadedFavorite.songId
            )
          );
        })
        .catch(() => {
          // TODO add proper UI error messages
          console.error('Failed to delete the song from favorites');
        });
    } else {
      // to fave a song
      addSongToFavorites({ songId })
        .then(({ data }) => {
          // put updated list of favorites in state
          setFavorites(favorites => [...favorites, data]);
          setFavIsLoading(false);
        })
        .catch(() => {
          // TODO add proper UI error messages
          console.error('Failed to add the song to favorites');
        });
    }
  };
  return (
    <ListItem index={index}>
      <div>
        <ImgWithFallback src={song.images} alt={song.title} />
      </div>
      <TitleColumn>
        <Heading>{song.title}</Heading>
        <SubHeading>{song.artist}</SubHeading>
      </TitleColumn>
      <div>
        <LevelIndicator level={song.level} />
      </div>
      <FavoriteButtonElement
        data-testid={isFavorite ? "FavoriteButton" : "UnFavoriteButton"}
        onClick={() => {
          handleFavoriteButton(song.id, isFavorite);
        }}
      >
        {isFavorite ? (
          <FavoriteIcon favIsLoading={favIsLoading} />
        ) : (
          <FavoriteBorderIcon favIsLoading={favIsLoading} data-testid="UnFavoriteButton" />
        )}
      </FavoriteButtonElement>
    </ListItem>
  );
};

export default Card;
