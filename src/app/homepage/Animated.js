

import React from 'react';
import styled, { keyframes } from 'styled-components';

// First wave animation
const waveAnimation1 = keyframes`
  0% { d: path('M200,0 Q250,150 200,300 T200,600'); }
  50% { d: path('M200,0 Q300,150 200,300 T200,600'); }
  100% { d: path('M200,0 Q250,150 200,300 T200,600'); }
`;

const waveAnimation2 = keyframes`
  0% { d: path('M150,0 Q200,150 300,250 T800,450'); }
  50% { d: path('M150,0 Q250,150 300,250 T900,450'); } 
  100% { d: path('M150,0 Q200,150 300,250 T860,450'); }
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('/mnt/data/Blog-Site-01.png') no-repeat center center/cover;
`;

const SvgContainer = styled.svg`
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
`;

const AnimatedLine1 = styled.path`
  stroke: #FFB84D;
  stroke-width: 2;
  fill: none;
  animation: ${waveAnimation1} 5s ease-in-out infinite;
`;

const AnimatedLine2 = styled.path`
  stroke: #BAA089;
  stroke-width: 2;
  fill: none;
  animation: ${waveAnimation2} 6s ease-in-out infinite;
`;

const AnimatedBackground = () => {
  return (
    <BackgroundWrapper>
      <SvgContainer viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <AnimatedLine1 d="M200,0 Q250,150 200,300 T200,400" />
        <AnimatedLine2 d="M150,0 Q200,150 300,300 T400,550" />
      </SvgContainer>
    </BackgroundWrapper>
  );
};

export default AnimatedBackground;
