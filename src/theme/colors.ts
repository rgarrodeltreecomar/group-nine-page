
import { useColorModeValue } from "@chakra-ui/react";

export const useCustomColors = () => {
  const bgColor = useColorModeValue("blue.500", "blue.200");
  const textColor = useColorModeValue("white", "gray.800");
  const iconColorScheme = useColorModeValue("blue", "blue.200");
  const carouselBgColor = useColorModeValue("gray.800", "gray.900");

  return {
    bgColor,
    textColor,
    iconColorScheme,
    carouselBgColor,
  };
};