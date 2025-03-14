import { Box, Flex, Text, Image, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { teamMembers } from "./DataMembers";
import { IconType } from "react-icons";
import { TextComponent } from "../TextComponent/TextComponent";

const MotionBox = motion(Box);

interface SocialLink {
    icon: IconType;
    url: string;
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
    social: SocialLink[];
}

const ProfileCard = ({ name, role, image, social }: TeamMember) => {
    const bgColor = useColorModeValue("gray.800", "gray.900");
    const textColor = useColorModeValue("white", "gray.800");
    const iconColorScheme = useColorModeValue("blue", "blue.200");

    return (
        <MotionBox
            p={4}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="xl"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image
                src={image}
                alt={name}
                borderRadius="full"
                boxSize="120px"
                mx="auto"
                mb={4}
            />
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
                {name}
            </Text>
            <Text fontSize="md" color="gray.400">
                {role}
            </Text>
            <Flex justify="center" mt={3} gap={2}>
                {social.map(({ icon: Icon, url }, index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        <IconButton
                            icon={<Icon />}
                            aria-label={name}
                            colorScheme={iconColorScheme}
                            variant="ghost"
                        />
                    </a>
                ))}
            </Flex>
        </MotionBox>
    );
};

export const TeamContainer = () => {
    const containerBgColor = useColorModeValue("gray.800", "gray.900");

    return (

        <Box id="equipo" textAlign="center" p={8} bg={containerBgColor}>
        <TextComponent variant="title"
        >
       Conocé el equipo
        </TextComponent>
        <Flex
            direction={{ base: "column", md: "row" }}
            wrap="wrap"
            justify="center"
            gap={10}
            p={8}
            bg={containerBgColor}
        >
            {teamMembers.map((member, index) => (
                <ProfileCard key={index} {...member} />
            ))}
        </Flex>
        </Box>
    );
};