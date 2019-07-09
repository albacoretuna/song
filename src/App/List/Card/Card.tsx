// Card component, showing a song detail

// libs
import React, { useState, FunctionComponent } from 'react';
import axios from 'axios';

// ours
import { Song, Favorite } from '../../App';
import { favoritesUrl } from '../../api';
import LevelIndicator from '../../lib/LevelIndicator';

import { FavoriteButtonElement, SubHeading, Heading, Photo, ListItem, FavoriteIcon, FavoriteBorderIcon } from './Card.Components';

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

      axios
        .delete(favoritesUrl + '/' + favorite.id)
        .then(({ data }) => {
          setFavIsLoading(false);
          // update favorites in state
          setFavorites(favorites =>
            favorites.filter(
              loadedFavorite => favorite.songId !== loadedFavorite.songId
            )
          );
        })
        .catch();
    } else {
      // to fave a song
      axios
        .post(favoritesUrl, { songId })
        .then(({ data }) => {
          // put updated list of favorites in state
          setFavorites(favorites => [...favorites, data]);
          setFavIsLoading(false);
        })
        .catch();
    }
  };
  return (
    <ListItem index={index}>
      <div>
        <Photo src={song.images} alt={song.title} />
      </div>
      <div>
        <Heading>{song.title}</Heading>
        <SubHeading>{song.artist}</SubHeading>
      </div>
      <div>
        <LevelIndicator level={song.level} />
      </div>
      <FavoriteButtonElement
        onClick={() => {
          handleFavoriteButton(song.id, isFavorite);
        }}
      >
        {isFavorite ? (
          <FavoriteIcon favIsLoading={favIsLoading} />
        ) : (
          <FavoriteBorderIcon favIsLoading={favIsLoading} />
        )}
      </FavoriteButtonElement>
    </ListItem>
  );
};

export default Card;
