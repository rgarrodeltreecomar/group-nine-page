import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TextComponent, BoxContainer, ReactCsharImage } from "../../components"



export const LearnMore: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg={useColorModeValue("gray.800", "gray.900")}
      px={4}
      gap={{ base: 6, md: 12 }}
      pt={{ base: 8, md: 16 }}
    >
        <BoxContainer>
        <Flex
          direction="column"
          alignItems={{ base: "flex-start", md: "flex-start" }}
          textAlign={{ base: "start", md: "left" }}
          maxWidth={{ base: "100%", md: "50%" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TextComponent variant="subtitle" hoverVariant="react">
              Quienes somos
            </TextComponent>
            <TextComponent variant="title" hoverVariant="react">
              Grupo 9
            </TextComponent>
            <TextComponent variant="body" hoverVariant="react">
              Somos un equipo de tres programadores apasionados por la tecnología y el desarrollo de software. Unidos por el desafío de la competencia HackaCode, estamos creando una plataforma innovadora para la gestión de una clínica médica.
            </TextComponent>
          </motion.div>
          <BoxContainer maxWidth={{ base: "10%", md: "50%" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
        <ReactCsharImage size="large" alt="Miniatura de la app" />
        </motion.div>
      </BoxContainer>
        </Flex>
      </BoxContainer>
    </Flex>
  );
};