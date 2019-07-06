// libs
import React, { FunctionComponent, Fragment } from 'react';
import styled from 'styled-components';

type LevelIndicatorProps = {
  level: number;
};


const Indicator = styled.svg`
  width: 40px;
  height: 40px;
`;

const TextGroup = styled.g`
  font: 30px 'Montserrat', Arial, sans-serif;
  fill: #fff;
  transform: translateY(0.25em);
`;

const LevelNumber = styled.text`
  font-size: 0.6em;
  line-height: 1;
  text-anchor: middle;
`;


/*
 *
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="#ce4b99"
        strokeWidth="3"
        strokeDasharray="40 60"
        strokeDashoffset="25"
      />
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="#b1c94e"
        strokeWidth="3"
        strokeDasharray="20 80"
        strokeDashoffset="85"
      />
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="#377bbc"
        strokeWidth="3"
        strokeDasharray="30 70"
        strokeDashoffset="65"
      />
 * */

// Learned how to implement this by reading
// https://medium.com/@heyoka/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
const LevelIndicator: FunctionComponent<LevelIndicatorProps> = ({ level }) => (
  <Fragment>
    <Indicator viewBox="0 0 42 42" className="donut">
      <circle cx="21" cy="21" r="15.915" fill="#000" />
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="#3B3938"
        strokeWidth="3"
        strokeDasharray="30 3"
        strokeDashoffset="55"
      />
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.915"
        fill="transparent"
        stroke="red"
        strokeWidth="3"
        strokeDasharray={`${level * 6.66666666}  ${100 - level * 6.66666}`}
        strokeDashoffset="25"
        strokeLinecap="round"
      />
      <TextGroup>
        <LevelNumber x="50%" y="50%">
          {level}
        </LevelNumber>
      </TextGroup>
    </Indicator>
  </Fragment>
);

export default LevelIndicator;
