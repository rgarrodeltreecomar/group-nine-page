import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Thumbnail, TextComponent } from '../../components';
import { useCustomColors } from "../../theme";

export const Home: React.FC = () => {

  const {bgColor, textColor, carouselBgColor} = useCustomColors();


  const handleRedirect = () => {
    window.open("https://turno-facil.vercel.app/", "_blank");
  };

  return (
    <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
      >
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg={carouselBgColor}
      px={4}
      gap={{ base: 6, md: 12 }} 
      pt={{ base: 8, md: 16 }}
    >
<motion.div
        style={{ display: "inline-block" }} 
        animate={{ y: [0, -10, 0] }} 
        transition={{
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
      >
      <Box
        id="inicio"
        border="2px solid"
        borderColor={bgColor}
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        onClick={handleRedirect}
        _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
        display="inline-block"
        order={{ base: 1, md: 2 }} 
      >
        <Thumbnail size="large" alt="Miniatura de la app" /> 
      </Box>
      </motion.div>

      <Flex
        direction="column"
        alignItems={{ base: "center", md: "flex-start" }} 
        textAlign={{ base: "center", md: "left" }}
        maxWidth={{ base: "100%", md: "50%" }} 
        order={{ base: 2, md: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TextComponent variant="title">
            Somos un grupo de estudiantes
          </TextComponent>
          <TextComponent
            variant="onTitle"
          >
            que participó en una hackathon
          </TextComponent>
        </motion.div>

        <Box mt={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleRedirect}
              bg={bgColor}
              color={textColor}
              size="lg"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
            >
              Visita nuestra app
            </Button>
          </motion.div>
        </Box>
      </Flex>
    </Flex>
    </motion.div>
  );
};