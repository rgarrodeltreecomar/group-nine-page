import React from "react";
import { Box } from "@chakra-ui/react";
import { ContactForm, Home, ImageCarousel, LearnMore, Navbar, ScrollAnimation, TeamContainer } from "../components/";

export const LandingPage: React.FC = () => {
  return (
    <Box width="100%" overflowX="hidden"> 
      <Navbar />
      
      <Box 
        maxWidth="1200px"   
        margin="0 auto"    
        paddingX={4}        
        boxSizing="border-box" 
      >
        <ScrollAnimation><Home /></ScrollAnimation>
        <ScrollAnimation><LearnMore /></ScrollAnimation>
        <ScrollAnimation><TeamContainer /></ScrollAnimation>
        <ScrollAnimation>
        <Box width="100%">
            <ImageCarousel />
          </Box>
        </ScrollAnimation>
        <ScrollAnimation><ContactForm /></ScrollAnimation>
      </Box>
    </Box>
  );
};