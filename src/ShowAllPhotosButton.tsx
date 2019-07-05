// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const getButtonText = (showAllPhotos: boolean): string =>
  showAllPhotos ? 'Hide All photos' : 'Show all photos';

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

type ShowAllPhotosButtonProps = {
  showAllPhotos: boolean;
  setShowAllPhotos: Dispatch<SetStateAction<boolean>>
}

// A button to open/collapse all photos
const ShowAllPhotosButton: FunctionComponent<ShowAllPhotosButtonProps> = ({showAllPhotos, setShowAllPhotos}) =>
        <Button onClick={() => setShowAllPhotos(!showAllPhotos)}>
          {getButtonText(showAllPhotos)}
        </Button>
export default ShowAllPhotosButton;
