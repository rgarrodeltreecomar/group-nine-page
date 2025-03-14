import { Box } from '@chakra-ui/react';
import React from 'react';

interface LogoComponentProps {
  size?: 'small' | 'medium' | 'large';
  alt?: string;
}

export const Logo: React.FC<LogoComponentProps> = ({ size = 'medium', alt }) => {
  let width: number;
  let height: number;

  switch (size) {
    case 'small':
      width = 100;
      height = 75;
      break;
    case 'medium':
      width = 200;
      height = 150;
      break;
    case 'large':
      width = 300;
      height = 225;
      break;
    default:
      width = 200;
      height = 150;
  }

  return(
    <Box width={`${width}px`} height={`${height}px`} overflow="hidden">
    <img src="/grupo-nine.png" alt={alt} width={width} height={height} />;
    </Box>
  ) 
};

