// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// ours
import Colors from '../../style/Colors';

type LevelIndicatorProps = {
  level: number;
  selected?: boolean;
};

const Indicator = styled.svg`
  width: 40px;
  height: 40px;
`;

const TextGroup = styled.g`
  font: 30px 'Montserrat', Arial, sans-serif;
  transform: translateY(0.25em);
`;

type LevelNumberProps= {
  selected?: boolean
}

const LevelNumber = styled.text<LevelNumberProps>`
  font-size: 0.6em;
  line-height: 1;
  fill: ${({selected}) => selected? '#000' : '#fff'};
  text-anchor: middle;
  font-weight: 600;
`;

// color based on the level: 1-5 green, 6-10 orange, 10-15 red
const getColor = (level: number): string => {
  if (level >= 1 && level <= 5) {
    return Colors.SushiGreen;
  } else if (level >= 6 && level <= 10) {
    return Colors.PizzazzOrange;
  } else if (level >= 10 && level <= 15) {
    return Colors.MonzaRed;
  }

  // default to gray just in case
  return Colors.Gray;
};

// A very informative article about making donut charts:
// https://medium.com/@heyoka/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
const LevelIndicator: FunctionComponent<LevelIndicatorProps> = ({ level, selected }) => {

const getStrokeDasharray = (level: number) => {
  const maxLevel = 15;

  // read the article above to understand how strokeDasharray works
  return `${level * 100 / maxLevel}  ${100 - level * 100 / maxLevel}`
};
  return <Indicator viewBox="0 0 42 42">
      // inner circle
      <circle cx="21" cy="21" r="20" fill="#000" />
      // gray outline
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke={Colors.DuneGray}
        strokeWidth="2"
        strokeDasharray="30 3"
        strokeDashoffset="55"
      />
      // actual indicator circle
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke={getColor(level)}
        strokeWidth="2"
        strokeDasharray={getStrokeDasharray(level)}
        strokeDashoffset="25"
        strokeLinecap="round"
      />
      // 3 dark dividers on the indicator circle
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke={Colors.Black}
        strokeWidth="2"
        strokeDasharray="3 30"
        strokeDashoffset="59"
      />
    {selected && <circle cx="21" cy="21" r="20" fill="#fff" />}
    <TextGroup>
        <LevelNumber x="50%" y="50%" selected={selected}>
          {level}
        </LevelNumber>
      </TextGroup>
    </Indicator>
};

export default LevelIndicator;
