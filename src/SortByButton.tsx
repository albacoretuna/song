// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import { SortBy } from './App';

const getButtonText = (sortBy: SortBy): string =>
  sortBy === 'ZA' ? 'Sort A to Z' : 'Sort Z to A';

const Button = styled.button`
  background: rgba(167, 207, 215, 0.2);
  text-transform: uppercase;
  border: 1px solid black;
  padding: 10px;
  margin: 30px 10px 10px 10px;
  min-width: 200px;
`;


// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type SortByButtonProps = {
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>
}

// A button to sort trees by name
const SortByButton: FunctionComponent<SortByButtonProps> = ({sortBy, setSortBy}) =>
  <Button onClick={() => setSortBy(sortBy === 'AZ' ? 'ZA' : 'AZ')}>
          {getButtonText(sortBy)}
        </Button>
export default SortByButton;
