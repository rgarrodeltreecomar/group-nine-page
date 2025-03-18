
import { useColorModeValue } from "@chakra-ui/react";

export const useCustomColors = () => {
  const bgColor = useColorModeValue("blue.500", "blue.200");
  const textColor = useColorModeValue("white", "gray.800");
  const iconColorScheme = useColorModeValue("blue", "blue.200");
  const carouselBgColor = useColorModeValue("gray.800", "gray.900");
  const csharpColor = useColorModeValue("#68217A", "#9B4F96"); 
  const csharpSecondaryColor = useColorModeValue("#9B4F96", "#68217A"); 
  const reactColor = useColorModeValue("#61DAFB", "#20232A"); 
  const reactBgColor = useColorModeValue("#20232A", "#61DAFB"); 

  return {
    csharpColor,
    csharpSecondaryColor,
    reactColor,
    reactBgColor,
    bgColor,
    textColor,
    iconColorScheme,
    carouselBgColor,
  };
};