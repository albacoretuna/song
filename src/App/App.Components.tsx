/**
 * Storing styled components used in App.tsx
 * Later on they can be moved to somewhere more general
 **/

// libs
import React from 'react';
import styled from 'styled-components';

// ours
import HeroImgMobile from '../images/yousician-hero-mobile.png';
import HeroImgMobile2X from '../images/yousician-hero-mobile@2x.png';
import HeroImgMobile3X from '../images/yousician-hero-mobile@3x.png';

import SpinnerSvg from '../images/audio.svg';

const Hero = styled.header`
  text-align: center;
  color: white;
  background: red;
  background: url(${HeroImgMobile}) no-repeat;
  background-size: cover;
  padding: 20px;

  @media
  (min-device-pixel-ratio: 2),
  (min-resolution: 192dpi) {
    .img {
      background-image: url(${HeroImgMobile2X});
    }
  }

  @media
  (min-device-pixel-ratio: 3),
  (min-resolution: 280dpi) {
    .img {
      background-image: url(${HeroImgMobile3X});
    }
  }

`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 900;
`;

const SubHeading = styled.h2`
  font-size: 14px;
  font-weight: 400;
`;

// Sticky footer 2019 edition, using grids!
const AppWrapper = styled.div`
  min-height: calc(100vh - 70px);
`;

const Footer = styled.footer`
  margin-top: 10px;
  font-size: 12px;
  color: white;
  text-align: center;
  height: 50px;
`;

const LoadingSpinnerElement = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const NoSongsFound = styled.div`
  color: white;
  text-align: center;
  margin: 20px 20px;
`;

const LoadingSpinner = () => (
  <LoadingSpinnerElement>
    <LoadingText>Loading...</LoadingText>
    <img src={SpinnerSvg} alt="Loading" />
  </LoadingSpinnerElement>
);



export {
  Hero,
  Heading,
  SubHeading,
  AppWrapper,
  LoadingSpinner,
  LoadingText,
  NoSongsFound,
  Footer
};
