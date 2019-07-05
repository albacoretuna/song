// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { Tree } from './App';
import Frame from './Frame';

const GalleryWrapper = styled.ul`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2%;
  justify-content: center;

  @media only screen and (min-device-width: 667px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2%;
  }
`;

type GalleryProps = {
  trees: Tree[];
  showAllPhotos: boolean;
  searchText: string;
  sortBy: string;
};

const Gallery: FunctionComponent<GalleryProps> = ({
  trees,
  showAllPhotos,
  searchText,
  sortBy
}) => (
  <GalleryWrapper>
    {trees
      .filter(
        (tree: Tree) =>
          tree.name && tree.name.toLowerCase().includes(searchText)
      )
      .sort(
        (treeA: Tree, treeB: Tree) =>
          sortBy === 'AZ'
            ? treeA.name.localeCompare(treeB.name)
            : treeB.name.localeCompare(treeA.name)
      )
      .map((tree: Tree, index: number) => (
        <Frame
          tree={tree}
          key={index /*TODO in production get unique ids from backend*/}
          showAllPhotos={showAllPhotos}
        />
      ))}
  </GalleryWrapper>
);

export default Gallery;
