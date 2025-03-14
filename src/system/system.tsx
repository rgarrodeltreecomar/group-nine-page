import { extendTheme } from "@chakra-ui/react"; 

export const system = extendTheme({
  colors: {
    primary: "#512BD4", // Morado de .NET
    secondary: "#61DAFB", // Azul claro de React
    background: "#20232A", // Gris oscuro para frontend
    backgroundAlt: "#2D2D2D", // Gris claro para backend
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


