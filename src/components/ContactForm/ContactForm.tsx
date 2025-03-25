import React from "react";
import { Box, Button, Flex, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Textarea,Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useContactForm } from "../../hooks";
import { TextComponent} from "../../components";
import { useCustomColors } from "../../theme";
import { BsBuilding, BsEnvelope, BsPerson } from 'react-icons/bs'

export const ContactForm: React.FC = () => {
  const {csharpColor,textColor,carouselBgColor } = useCustomColors();
  const { formData, form, isLoading, handleChange, handleSubmit, isChecked, setIsChecked } = useContactForm();

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <Flex id="contacto" direction="column" alignItems="center" justifyContent="center" minHeight="100vh" bg={carouselBgColor} px={4} gap={6} pt={8}>
        <TextComponent variant="title" textColor={textColor} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
          Contactar
        </TextComponent>
        <Box 
              as="form" 
              ref={form} 
              onSubmit={handleSubmit} 
              border="2px solid" 
              borderColor="rgba(31, 12, 35, 0.3)"
              borderRadius="lg" 
              p={6} 
              width={{ base: "100%", md: "50%" }}
            >
          <Flex direction="column" gap={4}>
            <HStack spacing={4}>
              <InputGroup flex="1">
                <InputLeftElement pointerEvents="none">
                  <BsPerson />
                </InputLeftElement>
                <Input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
              </InputGroup>
              <InputGroup flex="1">
                <Input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
              </InputGroup>
            </HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BsBuilding />
              </InputLeftElement>
              <Input name="empresa" placeholder="Empresa (opcional)" value={formData.empresa} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BsEnvelope />
              </InputLeftElement>
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <InputRightElement pointerEvents="none">@</InputRightElement>
            </InputGroup>
            <Textarea name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange} required />
            <Checkbox isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
            <TextComponent color="gray.600">Acepto que mis datos serán compartidos con Grupo 9.</TextComponent>
            </Checkbox>
            <Flex justifyContent={{ base: "center", md: "flex-end" }}>
              <motion.div animate={{ opacity: isLoading ? 0.7 : 1 }} transition={{ duration: 0.2 }}>
                <Button type="submit" bg={csharpColor} color={textColor} size="lg" _hover={{ bg: "blue.600" }} _active={{ bg: "blue.700" }} disabled={isLoading}>
                  {isLoading ? <Spinner size="sm" /> : "Enviar"}
                </Button>
              </motion.div>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Toaster position="top-right" />
    </motion.div>
  );
};