import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface ThumbnailProps {
  size?: 'small' | 'medium' | 'large';
  alt?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ size = 'medium', alt = 'Thumbnail' }) => {
  let width: number;
  let height: number;

  switch (size) {
    case 'small':
      width = 150;
      height = 100;
      break;
    case 'medium':
      width = 300;
      height = 200;
      break;
    case 'large':
      width = 450;
      height = 300;
      break;
    default:
      width = 300;
      height = 200;
  }

  return (
    <Box width={`${width}px`} height={`${height}px`} overflow="hidden">
      <Image 
        src="/thumbnail.png"
        alt={alt} 
        width="100%"
        height="100%"
        objectFit="contain" 
      />
    </Box>
  );
};