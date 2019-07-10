// Card component, showing a song detail

// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

// ours
import Colors from '../../../style/Colors';
import PlaceholderForBorkenImages from '../../../images/placeholder-for-broken-cover-photos.png';

const FavoriteButtonElement = styled.button`
  background-color: transparent;
  border: 0;
  display: inline-block;
  -ms-grid-column: 4;
  -ms-grid-row: 1;
`;

type ListItemProps = {
  index: number;
};

const ListItem = styled.li<ListItemProps>`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr 1fr;
  -ms-grid-rows: 4fr;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  border: none;
  padding: 5px;
  height: fit-content;
  background-color: ${({ index }) => (index % 2 === 0 ? 'black' : '#171717')};
  color: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`;

const ImageColumn = styled.div`
  -ms-grid-column: 1;
  -ms-grid-row: 1;
`;

const TitleColumn = styled.div`
  -ms-grid-column: 2;
  -ms-grid-row: 1;
  padding: 10px;

  ${breakpoint('desktop')`
    padding: 10px 20px;
  `};
`;

const LevelColumn = styled.div`
  -ms-grid-column: 3;
  -ms-grid-row: 1;
`;

const Img = styled.img`
  display: inline-block;
  max-width: 100px;
`;

type ImgWithFallbackProps = {
  src: string;
  alt: string;
};

const ImgWithFallback: FunctionComponent<ImgWithFallbackProps> = ({
  src,
  alt
}) => {
  const addDefaultSrc = (event: any) => {
    if (event && event.target) {
      event.target.src = PlaceholderForBorkenImages;
      // TODO optionally we send an error report to our error tracking system,
      // to find out about broken image links
    }
  };

  return <Img src={src} alt={alt} onError={addDefaultSrc} />;
};

const Heading = styled.h1`
  font-size: 14px;
  font-weight: 500;
`;

const SubHeading = styled.h2`
  font-size: 12px;
  color: ${Colors.Gray};
  font-weight: 500;
`;

export {
  FavoriteButtonElement,
  SubHeading,
  Heading,
  ImgWithFallback,
  ListItem,
  TitleColumn,
  ImageColumn,
  LevelColumn
};
