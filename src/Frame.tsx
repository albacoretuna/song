// Frame component, as in photo frame

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { Tree } from './App';
import TreeDescription from './TreeDescription';

type FrameProps = {
  tree: Tree;
  showAllPhotos: boolean;
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

const ListItem = styled.li`
  text-align: center;
  list-style: none;
  border: none;
  padding: 20px;
  height: fit-content;
  color: #594b4b;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
`;

const SongPhoto = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  transition: max-height 0.25s ease-out;
  overflow: hidden;
  transition: max-height 0.25s ease-in;
`;

const LookUp = styled.p`
  color: grey;
  font-size: 12px;
`;


const Frame: FunctionComponent<FrameProps> = ({ tree, showAllPhotos }) => {

  return (
    <ListItem>
      <SongPhoto
        src={tree.image}
        alt={tree.name}
      />
      <h1>{tree.name}</h1>
      <h2>{tree.species_name}</h2>
      <TreeDescription speciesName = {tree.species_name} />
      <LookUp>
        <a href={'https://www.ecosia.org/search?q=' + tree.name}>
          Look {tree.name} up
        </a>
      </LookUp>
    </ListItem>
  );
};

Frame.defaultProps = {
  showAllPhotos: false
};

export default Frame;
