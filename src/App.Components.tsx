/**
 * Storing styled components used in App.tsx
 * Later on they can be moved to somewhere more general
 **/

// libs
import React from 'react';
import styled from 'styled-components';

// ours
import HeroImg from './images/yousician-hero-mobile.png';
import SpinnerSvg from './images/audio.svg';

const Hero = styled.header`
  text-align: center;
  color: white;
  background: red;
  background: url(${HeroImg}) no-repeat;
  background-size: cover;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 900;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 400;
`;

const AppWrapper = styled.div`
  height: 100%;
`;

const LoadingSpinnerElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  color: white;
  padding: 20px;
`;

const LoadingText = styled.p`
  margin: 15px;
  color: white;
`;

const LoadingSpinner = () => (
  <LoadingSpinnerElement>
    <LoadingText>Loading...</LoadingText>
    <img src={SpinnerSvg} alt="Loading" />
  </LoadingSpinnerElement>
);

export { Hero, Heading, SubHeading, AppWrapper, LoadingSpinner, LoadingText };
