import { extendTheme } from "@chakra-ui/react"; 

export const system = extendTheme({
  colors: {
    primary: "#512BD4",
    secondary: "#61DAFB",
    background: "#20232A", 
    backgroundAlt: "#2D2D2D",
    text: "#FFFFFF",
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "text",
      },
    },
  },
});


