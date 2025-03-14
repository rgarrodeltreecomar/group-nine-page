import React from "react";
import { Box } from "@chakra-ui/react";
import { Home, LearnMore, Navbar } from "../components/";

export const LandingPage: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Home/>
      <LearnMore/>
    </Box>
  );
};