import React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface MenuIconButtonProps extends IconButtonProps {
  isOpen: boolean;
}

export const MenuIconButton: React.FC<MenuIconButtonProps> = ({ isOpen, ...rest }) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ['aria-label']: _, ...filteredRest } = rest;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconButton
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        color="#61DAFB"
        _hover={{ bg: "#68217A", color: "white" }}
        _active={{ bg: "#68217A", color: "white" }}
        variant="outline"
        borderColor="#61DAFB"
        {...filteredRest}
      />
    </motion.div>
  );
};