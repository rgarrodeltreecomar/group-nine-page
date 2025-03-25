import { Box, Image, useBreakpoint } from "@chakra-ui/react";


const BREAKPOINTS_ORDER = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

type ThumbnailProps = {
  size?: "small" | "medium" | "large" | { [breakpoint: string]: string };
  alt?: string;
};

export const Thumbnail: React.FC<ThumbnailProps> = ({
  size = 'medium',
  alt = 'Thumbnail'
}) => {
  const currentBreakpoint = useBreakpoint();
  
  const getResponsiveSize = () => {
    if (typeof size === 'object') {

      const validBreakpoints = BREAKPOINTS_ORDER
        .slice(0, BREAKPOINTS_ORDER.indexOf(currentBreakpoint) + 1)
        .reverse();

      const matchedBreakpoint = validBreakpoints.find(bp => size[bp]);

      return matchedBreakpoint ? size[matchedBreakpoint] : size.base || 'medium';
    }
    return size;
  };

  const getDimensions = () => {
    const currentSize = getResponsiveSize();
    
    switch (currentSize) {
      case 'small': return { width: 150, height: 100 };
      case 'medium': return { width: 300, height: 200 };
      case 'large': return { width: 450, height: 300 };
      default: return { width: 300, height: 200 };
    }
  };

  const { width, height } = getDimensions();

  return (
    <Box 
      width={`${width}px`} 
      height={`${height}px`} 
      overflow="hidden"
      sx={{
        '@media screen and (max-width: 480px)': {
          width: `${width * 0.8}px`,
          height: `${height * 0.8}px`
        }
      }}
    >
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