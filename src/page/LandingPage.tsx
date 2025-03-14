import React from "react";
import { Box } from "@chakra-ui/react";
import { ContactForm, Home, ImageCarousel, LearnMore, Navbar,TeamContainer } from "../components/";

export const LandingPage: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Home/>
      <LearnMore/>
      <TeamContainer/>
      <ImageCarousel/>
      <ContactForm/>
    </Box>
  );
};