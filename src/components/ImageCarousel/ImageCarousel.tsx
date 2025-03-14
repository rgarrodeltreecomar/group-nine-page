import React, { useEffect, useRef, useState } from "react";
import { Box, Image, Flex, useColorModeValue } from "@chakra-ui/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { images } from "./Images";


const MotionBox = motion(Box);

export const ImageCarousel: React.FC = () => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);


  const carouselBgColor = useColorModeValue("gray.800", "gray.900");
  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);


  useEffect(() => {
    const animateCarousel = async () => {
      await controls.start({
        x: -carouselWidth,
        transition: { duration: 100, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    };

    animateCarousel();
  }, [carouselWidth, controls]);


  const handleDrag = (_event: MouseEvent, info: { offset: { x: number } }) => {
    x.set(info.offset.x);
  };

  return (
    <Box id="tecnologias" overflow="hidden" position="relative" width="100%" bg={carouselBgColor}>
      <MotionBox
        ref={carouselRef}
        drag="x"
        dragConstraints={{ right: 0, left: -carouselWidth }}
        onDrag={handleDrag}
        style={{ x }}
        animate={controls}
        display="flex"
        cursor="grab"
        whileTap={{ cursor: "grabbing" }}
      >
        {[...images, ...images].map((img, index) => ( 
          <Flex key={index} flex="0 0 auto" width="400px" height="300px" mx={2}>
            <Image src={img} alt={`Imagen ${index + 1}`} objectFit="cover" borderRadius="lg" />
          </Flex>
        ))}
      </MotionBox>
    </Box>
  );
};