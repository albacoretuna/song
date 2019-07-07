/**
 * Storing styled components used in App.tsx
 * Later on they can be moved to somewhere more general
 **/

// libs
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

const LoadingSpinner = styled.div`
  margin: 0 auto;
  color: white;
  padding: 20px;
  background: url(${SpinnerSvg}) no-repeat 50%;
  min-height: 100px;
  position: relative;
  &:before{
    content: "Loading...";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0
  }
`;

const LoadingText = styled.p`
  margin: 15px;
  color: white;
`;

export {Hero, Heading, SubHeading, AppWrapper, LoadingSpinner, LoadingText};

