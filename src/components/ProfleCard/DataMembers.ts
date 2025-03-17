import { FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { imagenProfiles } from "./ImagaProfile";

const {rodrigoProfile, edgardoProfile,santiagoProfile} = imagenProfiles();

export const teamMembers = [
  {
    name: "Rodrigo Garro",
    role: "Frontent developer",
    image: rodrigoProfile,
    social: [
      { icon: FaLinkedin, url: import.meta.env.VITE_RODRIGO_LINKEDIN },
      { icon: FaWhatsapp, url: import.meta.env.VITE_RODRIGO_WHATSAPP },
      { icon: FaEnvelope, url: import.meta.env.VITE_RODRIGO_EMAIL },   
    ],
  },
  {
    name: "Edgardo Uncos",
    role: "Backend developer",
    image:  edgardoProfile,
    social: [
      { icon: FaLinkedin, url: import.meta.env.VITE_EDGARDO_LINKEDIN },
      { icon: FaWhatsapp, url: import.meta.env.VITE_EDGARDO_WHATSAPP },
      { icon: FaEnvelope, url: import.meta.env.VITE_EDGARDO_EMAIL },   
    ],
  },
  {
    name: "Santiago Gimenez",
    role: "Backend developer",
    image: santiagoProfile,
    social: [
      { icon: FaLinkedin, url: import.meta.env.VITE_SANTIAGO_LINKEDIN },
      { icon: FaWhatsapp, url: import.meta.env.VITE_SANTIAGO_WHATSAPP },
      { icon: FaEnvelope, url: import.meta.env.VITE_SANTIAGO_EMAIL },   
    ],
  },

];

