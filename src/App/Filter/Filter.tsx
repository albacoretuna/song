// libs
import React, { useState, FunctionComponent } from 'react';

// ours
import LevelIndicator from '../lib/LevelIndicator';
import { maxLevel } from '../constants';
import {
  LevelButton,
  Panel,
  FilterElement,
  DropDownButton,
  FilterButton
} from './Filter.Components';

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

const Filter: FunctionComponent<FilterProps> = ({
  selectedLevels,
  setSelectedLevels
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

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

  return (
    <FilterElement>
      <DropDownButton onClick={toggleOpen} data-testid="FilterButton">
        <FilterButton isOpen={isOpen} selectedLevels={selectedLevels}/>
      </DropDownButton>
      <Panel isOpen={isOpen}>
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
