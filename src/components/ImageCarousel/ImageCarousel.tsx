/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,  useState, useCallback } from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import { motion} from "framer-motion";
import { useCustomColors } from "../../theme";
import { images } from "./Images";
import { TextComponent } from "../../components";
import { useCarrusel } from "../../hooks";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

export const ImageCarousel: React.FC = () => {
  const imageSize = { base: "180px", md: "250px", lg: "300px" };
  const imageSpacing = { base: 2, md: 4 };

  const {
    carouselRef,
    activeIndex,
    isDragging,
    count,
    controls,
    handleDragStart,
    handleDragEnd,
    handleDotClick,
    setActiveIndex,
    direction,
    startCarousel
  } = useCarrusel(imageSize, imageSpacing);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const { carouselBgColor, reactColor, csharpColor } = useCustomColors();

  const updateCarouselWidth = useCallback(() => {
    if (carouselRef.current) {

      const totalWidth = carouselRef.current.scrollWidth / 2;
      setCarouselWidth(totalWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);
    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, [updateCarouselWidth]);



  useEffect(() => {
    startCarousel(direction);
  }, [startCarousel, direction]);








  useEffect(() => {
    const unsubscribe = count.onChange((latest) => {
      const imageWidth = parseInt(imageSize.lg.replace("px", ""), 10);
      const spacing = imageSpacing.md * 2;
      const imageWidthWithMargin = imageWidth + spacing;
    
      const normalizedX = ((latest % carouselWidth) + carouselWidth) % carouselWidth;
      const progress = normalizedX / imageWidthWithMargin;
      
      const newIndex = Math.floor(progress) % images.length;
      setActiveIndex(newIndex);
    });
  
    return () => unsubscribe();
  }, [count, imageSize, imageSpacing, carouselWidth]);

  const handleImageClick = (index: number) => {
    if (!isDragging) {
      console.log("Imagen seleccionada:", images[index % images.length].name);
      startCarousel(direction);
    }
  };

  return (
    <Box
      id="tecnologias"
      overflow="hidden"
      position="relative"
      width="100%"
      bg={carouselBgColor}
      py={8}
      userSelect="none"
      css={{ "img": { userSelect: "none", pointerEvents: "none" } }}
    >
     <Flex 
      justifyContent="center" 
      mb={8} 
      px={4}
    >
      <TextComponent variant="title"
      >
        Tecnologías
      </TextComponent>
    </Flex>
      <MotionBox
        ref={carouselRef}
        drag="x"
        dragConstraints={{ right: 0, left: -carouselWidth }}
        style={{ x: count }}
        animate={controls}
        display="flex"
        cursor="grab"
        whileTap={{ cursor: "grabbing" }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {[...images, ...images].map((img, index) => (
          <Flex
            key={index}
            flex="0 0 auto"
            width={imageSize}
            height={imageSize}
            mx={imageSpacing}
            position="relative"
            onClick={() => handleImageClick(index)}
            cursor={isDragging ? "grabbing" : "pointer"}
            _hover={{ transform: "scale(1.02)" }}
            transition="transform 0.2s"
            flexDirection="column"
            alignItems="center"
          >
            <MotionImage
              src={img.url}
              alt={img.name}
              objectFit="contain"
              borderRadius="lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              width="70%"
              height="70%"
              draggable="false"
            />
            <Text mt={2} fontSize={{ base: "sm", md: "md" }} fontWeight="bold" color={reactColor} opacity={0.8}>
              {img.name}
            </Text>
          </Flex>
        ))}
      </MotionBox>

      <Flex justify="center" mt={4} gap={2}>
        {images.map((_, idx) => (
          <Box
            key={idx}
            w={activeIndex === idx ? "30px" : "12px"}
            h="12px"
            bg={activeIndex === idx ? csharpColor : reactColor}
            borderRadius="full"
            transition="all 0.3s ease"
            cursor="pointer"
            onClick={() => handleDotClick(idx)}
            _hover={{ transform: "scale(1.2)" }}
          />
        ))}
      </Flex>
    </Box>
  );
};