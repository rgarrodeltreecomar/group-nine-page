import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { backendAPI, endpoints } from "../service";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    mensaje: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Debes aceptar que tus datos serán compartidos con Grupo 9.", { duration: 2000 });
      return;
    }
    sendEmailForm(e);
  };

  const sendEmailForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.mensaje) {
      toast.error("Por favor, completa los campos obligatorios.", { duration: 2000 });
      return;
    }

    setIsLoading(true);

    try {
      const emailData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        empresa: formData.empresa || "No especificada",
        email: formData.email,
        mensaje: formData.mensaje,
      };

      console.log("Datos enviados:", emailData);
      const response = await backendAPI.post(endpoints.sendEmail, emailData);
      console.log("Respuesta del backend:", response.data);

      toast.success("Formulario enviado con éxito!", { duration: 2000 });

      setFormData({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        mensaje: "",
      });
      setIsChecked(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Hubo un error al enviar el formulario. Inténtalo de nuevo.", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    form,
    isLoading,
    handleChange,
    handleSubmit,
    sendEmailForm,
    isChecked,
    setIsChecked,
  };
};
