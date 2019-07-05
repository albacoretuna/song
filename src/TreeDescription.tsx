// TreeDescription displays a summary of speciesName, retrieved from wikipedia

// libs
import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type TreeDescriptionProps = {
  speciesName: string;
};

const Description = styled.p`
  color: rgba(0, 0, 0, 0.54);
  width: 80%;
  margin: 10px auto;
  text-align: left;
`;

const TreeDescription: FunctionComponent<TreeDescriptionProps> = ({
  speciesName
}) => {
  const [description, setDescription] = useState('');

  const getWikipediaDescription = (speciesName: string) => {
    const wikipediaSearchEndpoint =
      'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
    axios
      .get(wikipediaSearchEndpoint + speciesName)
      .then(({ data }) => {
        // description is found in [2][0] in current wikipedia search api spec
        const description = (data[2] && data[2][0]) || '';
        setDescription(description);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(
    () => {
      getWikipediaDescription(speciesName);
    },
    [speciesName]
  );
  return <Description>{description}</Description>;
};

export default TreeDescription;
