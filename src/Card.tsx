// Card component, showing a song detail

// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { Song } from './App';

type CardProps = {
  song: Song;
  index: number;
  isFavorite: boolean;
};

const Button = styled.button`
  background: rgba(0, 214, 255, 0.2);
  text-transform: uppercase;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  min-width: 200px;
`;
Button.displayName = 'Button';

type ListItemProps = {
  index: number;
};

// filled heart
const FavoriteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="red"
    />
  </svg>
);

// empty heart
const FavoriteBorderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
      fill="white"
    />
  </svg>
);

const ListItem = styled.li<ListItemProps>`
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  align-items: center;
  border: none;
  padding: 20px;
  height: fit-content;
  background-color: ${({ index }) => (index % 2 === 0 ? 'black' : '#171717')};
  color: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

const Photo = styled.img`
  display: inline-block;
  max-width: 90%;
`;

const Heading = styled.h1`
  font-size: 16px;
`;

const SubHeading = styled.h1`
  font-size: 14px;
`;

const Card: FunctionComponent<CardProps> = ({ song, index, isFavorite }) => {
  return (
    <ListItem index={index}>
      <div>
        <Photo src={song.images} alt={song.title} />
      </div>
      <div>
        <Heading>{song.title}</Heading>
        <SubHeading>{song.artist}</SubHeading>
      </div>
      <div>{song.level}</div>
      <div>{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</div>
    </ListItem>
  );
};

export default Card;
