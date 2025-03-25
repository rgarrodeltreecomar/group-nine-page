import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface ReactCsharImageProps {
  size?: "small" | "medium" | "large";
  alt?: string;
}

export const ReactCsharImage: React.FC<ReactCsharImageProps> = ({
  size = "medium",
  alt = "Thumbnail",
}) => {
  let maxWidth: string;
  let maxHeight: string;

  switch (size) {
    case "small":
      maxWidth = "150px";
      maxHeight = "100px";
      break;
    case "medium":
      maxWidth = "300px";
      maxHeight = "200px";
      break;
    case "large":
      maxWidth = "450px";
      maxHeight = "300px";
      break;
    default:
      maxWidth = "300px";
      maxHeight = "200px";
  }

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Image
        src="/dotnet-core-and-react.jpg"
        alt={alt}
        maxWidth={{ base: "90%", md: maxWidth }}
        maxHeight={{ base: "auto", md: maxHeight }}
        objectFit="contain"
      />
    </Box>
  );
};
