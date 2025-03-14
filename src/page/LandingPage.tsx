import React from "react";
import { Box } from "@chakra-ui/react";
import { Home, Navbar } from "../components/";

export const LandingPage: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Home/>
    </Box>
  );
};