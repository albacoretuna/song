// libs
import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import Colors from '../../style/Colors';
import LevelIndicator from '../lib/LevelIndicator';
import { maxLevel } from '../constants';

// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type FilterProps = {
  selectedLevels: number[]
  setSelectedLevels: Dispatch<SetStateAction<number[]>>
};


const FilterElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  color: ${Colors.White};
  overflow: hidden;
  padding: 10px;
`;

type PanelProps = {
  open: boolean;
};
const Panel = styled.div<PanelProps>`
  color: white;
  max-height: ${({ open }) => (open ? '600px' : '0')};
  overflow: hidden;
  padding: ${({ open }) => (open ? '10px' : '0')};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1%;
  margin: 0 auto;
`;

const DropDownButton = styled.button`
  border: none;
  background: black;
  color: white;
`;

const LevelButton = styled.button`
  border: none;
  background: black;
  color: white;
`;

const Filter: FunctionComponent<FilterProps> = ({ selectedLevels, setSelectedLevels }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  // toggle the clicked level in selectedLevels
  const handleClick = (level: number) => {
    setSelectedLevels(levels => {
      if(levels.includes(level)) {
        return levels.filter((currentLevels) => currentLevels !== level)
      } else {
        return [...levels, level]
      }
    } )
  }

  return (
    <FilterElement>
    <DropDownButton onClick={toggleOpen}>{open ? 'HIDE FILTER' : 'FILTER BY LEVEL'}</DropDownButton>
      <Panel open={!open}>
        {/* Create 15 buttons*/}
        {Array.from(Array(maxLevel)).map((level, i) => (
          <LevelButton key={i} onClick={() => handleClick(i)}><LevelIndicator level={i} selected={selectedLevels.includes(i)}/></LevelButton>
        ))}
      </Panel>
    </FilterElement>
  );
};

export default Filter;
