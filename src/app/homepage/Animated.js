import React from 'react';
import styled, { keyframes } from 'styled-components';

// First wave animation
const waveAnimation1 = keyframes`
  0% { d: path('M200,0 Q250,150 200,300 T200,600'); }
  50% { d: path('M200,0 Q300,150 200,300 T200,600'); }
  100% { d: path('M200,0 Q250,150 200,300 T200,600'); }
`;

const waveAnimation2 = keyframes`
  0% { d: path('M150,0 Q200,150 300,250 T800,450L800,0Z'); }
  50% { d: path('M150,0 Q250,150 300,250 T900,450L900,0Z'); } 
  100% { d: path('M150,0 Q200,150 300,250 T860,450L860,0Z'); }
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
const SvgContainer2 = styled.svg`
  position: absolute;
  left: 0;
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
  fill: #BAA089; /* Fill color added here */
  animation: ${waveAnimation2} 6s ease-in-out infinite;
`;

const waveAnimation3 = keyframes`
  0% { d: path('M10000,450 Q300,450 200,500 T500,600'); } /* Moved the first stable point to the left */
  50% { d: path('M10000,450 Q700,450 200,500 T500,600'); }
  100% { d: path('M10000,450 Q500,450 200,500 T500,600'); } /* Moved the second stable point to the left */
`;

const AnimatedLine3 = styled.path`
  stroke: #3C3C34;
  stroke-width: 2;
  fill: #3C3C34;
  animation: ${waveAnimation3} 5s ease-in-out infinite;
`;

const waveAnimation4 = keyframes`
  0% { d: path('M0,600 Q50,550 100,600 T200,200'); } /* Starting position for the wave */
  50% { d: path('M0,600 Q75,550 100,600 T200,200'); } /* Mid state of the wave */
  100% { d: path('M0,600 Q50,550 100,600 T200,200'); } /* Return to starting position */
`;

const AnimatedLine4 = styled.path`
  stroke: #3C3C34;
  stroke-width: 2;
  fill: #3C3C34;
  animation: ${waveAnimation4} 5s ease-in-out infinite;
`;

const AnimatedBackground = () => {
  return (
    <BackgroundWrapper>
      <SvgContainer viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        <AnimatedLine2 d="M150,0 Q200,150 300,250 T800,450L800,600L150,600Z" />
        <AnimatedLine3 d="M10000,450 Q500,450 200,500 T500,600" />
        <AnimatedLine1 d="M200,0 Q250,150 200,300 T200,400" />
      </SvgContainer>
      <SvgContainer2>
      <AnimatedLine4 d="M0,600 Q500,550 100,600 T200,200" />
      </SvgContainer2>


    </BackgroundWrapper>
  );
};



export default AnimatedBackground;
