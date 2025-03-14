import React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
  hoverColor?: string; 
  activeColor?: string; 
  textColor?: string;
  variant?: "title" | "subtitle" | "onTitle"|"body";
  hoverVariant?: "react" | "csharp" | "custom";
  
}

export const TextComponent: React.FC<TextComponentProps> = ({
  children,
  hoverColor = "#68217A", 
  activeColor = "white",
   textColor = "#ffffff",
   variant = "body",
   hoverVariant = "custom",
  ...rest
}) => {

  const hoverColors = {
    react: "#61DAFB", 
    csharp: "#68217A", 
    custom: hoverColor, 
  };

  const styles = {
    title: {
      fontSize: { base: "2xl", md: "4xl" },
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: { base: "xl", md: "2xl" },
      fontWeight: "semibold",
    },
    onTitle:{
      fontSize:{ base: "xl", md: "2xl" },
      fontWeight: 2
  },
    body: {
      fontSize: { base: "md", md: "lg" },
      fontWeight: "normal",
    },
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Text
        cursor="pointer"
        color={textColor}
        _hover={{ color: hoverColors[hoverVariant] }}
        _active={{ color: activeColor }} 
        {...styles[variant]}
        {...rest} 
      >
        {children}
      </Text>
    </motion.div>
  );
};