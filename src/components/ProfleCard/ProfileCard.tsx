import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { teamMembers } from "./DataMembers";
import { IconType } from "react-icons";
import { TextComponent } from "../TextComponent/TextComponent";
import { useCustomColors } from "../../theme";

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
    const { reactBgColor, textColor, iconColorScheme } = useCustomColors();

    return (
        <MotionBox
            p={{ base: 6, md: 12 }}
            bg={reactBgColor}
            borderRadius="lg"
            boxShadow="xl"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            width={{ base: "100%", md: "250px" }}
            mx="auto"
            mb={{ base: 4, md: 0 }}
        >
            <Image
                src={image}
                alt={name}
                borderRadius="full"
                boxSize={{ base: "120px", md: "150px" }}
                mx="auto"
                mb={{ base: 4, md: 6 }}
            />
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={textColor}>
                {name}
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.400">
                {role}
            </Text>
            <Flex justify="center" mt={{ base: 4, md: 6 }} gap={3}>
                {social.map(({ icon: Icon, url }, index) => (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                        <IconButton
                            icon={<Icon />}
                            aria-label={name}
                            colorScheme={iconColorScheme}
                            variant="ghost"
                            size={{ base: "md", md: "lg" }}
                        />
                    </a>
                ))}
            </Flex>
        </MotionBox>
    );
};

export const TeamContainer = () => {
    const { carouselBgColor } = useCustomColors();

    return (
        <Box id="equipo" textAlign="center" p={{ base: 4, md: 8 }} bg={carouselBgColor}>
            <TextComponent variant="title">
                Conocé el equipo
            </TextComponent>
            <Flex
                direction={{ base: "column", md: "row" }}
                wrap="wrap"
                justify="center"
                gap={{ base: 6, md: 12 }}
                p={{ base: 4, md: 10 }}
                bg={carouselBgColor}
            >
                {teamMembers.map((member, index) => (
                    <ProfileCard key={index} {...member} />
                ))}
            </Flex>
        </Box>
    );
};