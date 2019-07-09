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
  selectedLevels: number[];
  setSelectedLevels: Dispatch<SetStateAction<number[]>>;
};

type FilterIconProps = {
  fillColor?: string;
};

const FilterIconElement = styled.svg<FilterIconProps>`
  border: 2px solid white;
  ${({fillColor}) => fillColor? "background: white;" : ""}
  border-radius: 50%;
  padding: 5px;
  margin-left: 10px;
`;


const FilterIcon: FunctionComponent<FilterIconProps> = ({ fillColor }) => (
  <FilterIconElement
    fillColor={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path d="M0 0h16v16H0z" fill="none" />
    <path
  fill={fillColor ? 'black' : 'white'}
      id="a"
      d="M12.5 3.104a2.751 2.751 0 0 1 0 5.292v6.854a.75.75 0 1 1-1.5 0V8.396a2.751 2.751 0 0 1 0-5.292V.75a.75.75 0 1 1 1.5 0v2.354zM5 7.604a2.751 2.751 0 0 1 0 5.292v2.354a.75.75 0 1 1-1.5 0v-2.354a2.751 2.751 0 0 1 0-5.292V.75a.75.75 0 0 1 1.5 0v6.854zM4.25 11.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm7.5-4.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"
    />
  </FilterIconElement>
);

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

const ButtonContent = styled.div`
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Filter: FunctionComponent<FilterProps> = ({
  selectedLevels,
  setSelectedLevels
}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  // toggle the clicked level in selectedLevels
  const handleClick = (level: number) => {
    setSelectedLevels(levels => {
      if (levels.includes(level)) {
        // remove the level
        return levels.filter(currentLevels => currentLevels !== level);
      } else {
        // add the level
        return [...levels, level];
      }
    });
  };
  const getFilterButton = (open: boolean, selectedLevels: number[]) => {
    if (open) {
      return (
        <ButtonContent>
          {' '}
          <span>HIDE FILTER</span> <FilterIcon />
        </ButtonContent>
      );
    } else {
      if (selectedLevels.length > 0) {
        // drop down is closed, but some levels are selected

        const SelectedLevelHint = styled.span`
          border: 2px solid white;
          border-radius: 19px 0px 0px 20px;
          height: 20px;
          margin-right: -25px;
          margin-left: 10px;
          padding: 3px 20px;
          z-index: 0;
          border-right: none;
          align-self: baseline;
        `;

        // we can't show all 15 selectedLevels, this can be discussed with UX
        // For now I made a summarizer
        const getSelectedLevelsSummary = (selectedLevels: number[]) => {
          switch (selectedLevels.length) {
            case 1:
              return selectedLevels[0];
            case 2:
              return selectedLevels.join(', ');
            case 3:
              return selectedLevels.join(', ');
            default:
              return selectedLevels.slice(0,3).sort().join(', ') + '...'
          }
        }

        return (
          <ButtonContent>
            <span>FILTER BY LEVEL</span>{' '}
            <SelectedLevelHint>{getSelectedLevelsSummary(selectedLevels)}</SelectedLevelHint>
            <FilterIcon fillColor={'white'} />
          </ButtonContent>
        );
      } else {
        // closed and no level selected
        return (
          <ButtonContent>
            <span>FILTER BY LEVEL</span>
            <FilterIcon />
          </ButtonContent>
        );
      }
    }
  };
  return (
    <FilterElement>
      <DropDownButton onClick={toggleOpen}>
        {getFilterButton(open, selectedLevels)}
      </DropDownButton>
      <Panel open={open}>
        {/* Create 15 buttons*/}
        {Array.from(Array(maxLevel)).map((level, i) => (
          <LevelButton key={i + 1} onClick={() => handleClick(i + 1)}>
            <LevelIndicator
              level={i + 1}
              selected={selectedLevels.includes(i + 1)}
            />
          </LevelButton>
        ))}
      </Panel>
    </FilterElement>
  );
};

export default Filter;
