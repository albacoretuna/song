// Components used in the Filter component, preferably only tiny ones, larger components get their own files

// libs
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

// ours
import Colors from '../../style/Colors';

type FilterIconProps = {
  fillColor?: string;
};



const FilterElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  color: ${Colors.White};
  overflow: hidden;
  padding: 10px;
  max-width: 900px;
  margin: 0 auto;
`;

type PanelProps = {
  isOpen: boolean;
};
const Panel = styled.div<PanelProps>`
  color: white;
  max-height: ${({ isOpen }) => (isOpen ? '600px' : '0')};
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? '10px 0' : '0')};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto;

  ${breakpoint('tablet')`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  `};

  ${breakpoint('desktop')`
    display: block;
    grid-template-columns: unset;
    grid-gap: unset;
    margin: 0;
  `}
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

type FilterButtonProps = {
  isOpen: boolean;
  selectedLevels: number[];
};

export { LevelButton, Panel, FilterElement, DropDownButton };
