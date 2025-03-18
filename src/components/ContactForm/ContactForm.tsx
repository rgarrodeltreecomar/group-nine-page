import React from "react";
import { Box, Button, Flex, Input, Spinner, Textarea, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useContactForm } from "../../hooks";
import { TextComponent } from "../../components";
import { useCustomColors } from "../../theme";

export const ContactForm: React.FC = () => {
  const {csharpColor,textColor} = useCustomColors();
  const { formData, form, isLoading, handleChange, sendEmailForm } = useContactForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Flex
        id="contacto"
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bg={useColorModeValue("gray.800", "gray.900")}
        px={4}
        gap={6}
        pt={8}
      >
        <TextComponent variant="title" textColor={textColor}>
          Contactar
        </TextComponent>

        <Box
          as="form"
          ref={form}
          onSubmit={sendEmailForm}
          border="2px solid"
          borderColor={csharpColor}
          borderRadius="lg"
          p={6}
          width={{ base: "100%", md: "50%" }}
        >
          <Flex direction="column" gap={4}>
            <Input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <Input
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            <Input
              name="empresa"
              placeholder="Empresa (opcional)"
              value={formData.empresa}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
            />
            <motion.div
            animate={{ opacity: isLoading ? 0.7 : 1 }}
            transition={{ duration: 0.2 }}
            >
            <Button
              type="submit"
              bg={csharpColor}
              color={textColor}
              size="lg"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner size="sm" /> 
              ) : (
                "Enviar" 
              )}
            </Button>
            </motion.div>
          </Flex>
        </Box>
      </Flex>
      <Toaster position="top-right" />
    </motion.div>
  );
};