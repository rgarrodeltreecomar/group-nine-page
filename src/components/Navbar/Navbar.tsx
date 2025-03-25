import React, { useState, useEffect } from "react";
import { Box, Flex,  useDisclosure } from "@chakra-ui/react";
import { motion,useAnimation } from "framer-motion";
import { LogoGroup, TextComponent, MenuIconButton } from '../../components'; 
import { useCustomColors } from "../../theme";

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
  const controls = useAnimation();
  const {csharpColor} = useCustomColors();
  const [activeSection, setActiveSection] = useState<string>("inicio");


const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    const navbarHeight = 120; 
    const offset = section.offsetTop - navbarHeight;
    
    const startPosition = window.scrollY;
    const distance = offset - startPosition;

    const duration = 800;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
    onToggle();

    controls.start({
      scale: 1.1,
      transition: { duration: 0.2 },
    }).then(() => {
      controls.start({
        scale: 1,
        transition: { duration: 0.2 },
      });
    });
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.5 }
    );

    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
        bg="gray.800"
        color="white"
         position="fixed"
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
            <Box
                flexShrink={0}
                height="100%"
                display="flex"
                alignItems="center"
                onClick={reload}
                _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
                cursor="pointer"
            >
                <LogoGroup  alt="Logo Grupo 9" size="medium" />
                <TextComponent variant="title">Grupo 9™</TextComponent>
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
                    <TextComponent
                    key={item.id}
                    variant="subtitle"
                    hoverVariant="csharp"
                    textColor={activeSection === item.id ?csharpColor : "white"}
                    fontWeight={activeSection === item.id ? "bold" : "normal"}
                    onClick={() => scrollToSection(item.id)}
                    >
                    {item.label}
                    </TextComponent>
                ))}
            </Box>
            <Box
                    as={motion.div}
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{
                        opacity: 1,
                        x: isOpen ? "0%" : "-100%",
                        transition: { type: "spring", stiffness: 100 }
                    }}
                    exit={{ opacity: 0, x: "-100%" }}
                    position="fixed"
                    left={0}
                    top="150px" 
                    width="100%"
                    height="calc(100vh - 150px)" 
                    bg="gray.800"
                    display={{ base: isOpen ? "block" : "none", md: "none" }}
                    zIndex={999}
                    px={4}
                    py={8}
                >
                    <Flex direction="column" alignItems="center" gap={6}>
                        {menuItems.map((item) => (
                            <TextComponent
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                cursor="pointer"
                                fontSize="xl"
                                _hover={{ 
                                    color: "blue.200",
                                    transform: "translateX(10px)",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {item.label}
                            </TextComponent>
                        ))}
                    </Flex>
                </Box>
        </Flex>
    </Box>
);
};