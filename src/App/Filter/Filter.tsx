// libs
import React, { useState, FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import Colors from '../../style/Colors';
import LevelIndicator from '../lib/LevelIndicator';
import { maxLevel } from '../constants';

type FilterProps = {
  level?: number;
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

const Filter: FunctionComponent<FilterProps> = ({ level }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <FilterElement>
    <DropDownButton onClick={toggleOpen}>{open ? 'HIDE FILTER' : 'FILTER BY LEVEL'}</DropDownButton>
      <Panel open={!open}>
        {/* Create 15 buttons*/}
        {Array.from(Array(15)).map((level, i) => (
          <LevelButton key={i}><LevelIndicator level={i} selected={true}/></LevelButton>
        ))}
      </Panel>
    </FilterElement>
  );
};

export default Filter;
