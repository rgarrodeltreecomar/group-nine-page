import React, { useState, useEffect } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Logo, TextComponent, MenuIconButton } from '../../components'; 

const menuItems = [
    { id: "inicio", label: "Inicio" },
    { id: "saber-mas", label: "Saber más" },
    { id: "equipo", label: "Equipo" },
    { id: "tecnologias", label: "Tecnologías" },
    { id: "contacto", label: "Contacto" },
  ];

export const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      onToggle(); 
    }
  };

  const reload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box
      bg="gray.800"
      color="white"
      position="sticky"
      top={0}
      zIndex={1000}
      width="100%" 
      px={{ base: 4, md: 8 }} 
      boxShadow={isScrollingDown ? "0 4px 6px -1px rgba(104, 33, 122, 0.5), 0 2px 4px -1px rgba(104, 33, 122, 0.06)" : "none"}
      transition="box-shadow 0.3s ease-in-out"
    >
      <Flex
        h={150}
        alignItems="center" 
        justifyContent="space-between" 
        maxW="1200px" 
        mx="auto" 
      >
        <Box flexShrink={0} height="100%" display="flex" alignItems="center"  onClick={reload}
         _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
         cursor="pointer"
         >
          <Logo alt="Logo Grupo 9" size="medium" /> <TextComponent variant="title" >Grupo 9™</TextComponent>
        </Box>

        <MenuIconButton
          isOpen={isOpen}
          onClick={onToggle}
          display={{ base: "flex", md: "none" }}
          aria-label="Abrir menú"
        />
        <Box
          as={motion.div}
          display={{ base: "none", md: "flex" }}
          alignItems="flex-end"
          gap={8} 
          flexGrow={1} 
          justifyContent="end" 
        >
          {menuItems.map((item) => (
            <TextComponent  variant="subtitle" key={item.id} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </TextComponent>
          ))}
        </Box>
        <Box
          as={motion.div}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, y: 0 },
            closed: { opacity: 0, y: -20 },
          }}
          display={{ base: isOpen ? "block" : "none", md: "none" }} 
          width="full"
          mt={4}
          bg="gray.800"
        >
          <Flex direction="column" alignItems="center" gap={2}>
            {menuItems.map((item) => (
              <TextComponent  key={item.id} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </TextComponent>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};