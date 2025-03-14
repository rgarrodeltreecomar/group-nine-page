import React from "react";
import { Flex, FlexProps, } from "@chakra-ui/react";

interface BoxContainerProps extends FlexProps {
  children: React.ReactNode;
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children, ...rest }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="#68217A" 
      borderRadius="lg" 
      boxShadow="lg" 
      p={6} 
      {...rest}
    >
      {children}
    </Flex>
  );
};