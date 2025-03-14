import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

export const TextComponent: React.FC<TextComponentProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Text
        cursor="pointer"
        color="#61DAFB" 
        _hover={{ color: "#68217A" }} 
        _active={{ color: "white" }} 
        {...rest}
      >
        {children}
      </Text>
    </motion.div>
  );
};