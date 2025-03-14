import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export const useContactForm = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    mensaje: "",
  });


  const [isLoading, setIsLoading] = useState(false);

  // Acceder a las variables de entorno de Vite
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_PUBLIC_USER_ID;


  const form = useRef<HTMLFormElement>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      toast.error("Por favor, completa los campos obligatorios.", { duration: 2000 });
      return;
    }

    
    setIsLoading(true);

    
    if (form.current) {
      try {
        const result = await emailjs.sendForm(
          serviceId, 
          templateId, 
          form.current,
          userId 
        );

        console.log("Email enviado con éxito:", result);
        toast.success("Formulario enviado con éxito!", { duration: 2000 });

        // Limpiar el formulario después del envío
        setFormData({
          nombre: "",
          apellido: "",
          empresa: "",
          email: "",
          mensaje: "",
        });
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        toast.error("Hubo un error al enviar el formulario. Inténtalo de nuevo.", {
          duration: 2000,
        });
      } finally {
       
        setIsLoading(false);
      }
    }
  };

  
  return {
    formData,
    form,
    isLoading,
    handleChange,
    handleSubmit,
  };
};