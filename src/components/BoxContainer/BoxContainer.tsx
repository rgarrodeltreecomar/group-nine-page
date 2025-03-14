import React from "react";
import { Flex, FlexProps, } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface BoxContainerProps extends FlexProps {
  children: React.ReactNode;
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children, ...rest }) => {
  return (
    <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
    <Flex

      direction="row" 
      alignItems="center" o
      justifyContent="space-between"
      bg="#68217A" 
      borderRadius="lg" 
      boxShadow="lg" 
      p={6} 
      width={{ base: "100%", md: "100%", lg: "900px" }} 
      height={{ base: "auto", md: "auto", lg: "310px" }} 
      maxWidth="100%" 
      maxHeight="100%" 
      margin="0 auto" 
      {...rest}
    >
      {children}
    </Flex>
    </motion.div>
  );
};