import React, { useState} from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./SnippetLibrary.css"; // Archivo CSS para estilos
import SnippetForm from "../components/SnippetForm";

const SnippetLibrary = () => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
  });

  

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Guardar el snippet en Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return; // Asegurarse de que el usuario esté autenticado
    try {
      const snippetData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "snippets"), snippetData);
      setFormData({ title: "", code: "", description: "" }); // Limpiar formulario
    } catch (error) {
      console.error("Error al guardar el snippet: ", error);
    }
  };

  return (
    <div className="snippet-library">
      <h1>New Snippet</h1>

      {/* Formulario para agregar snippet */}
      <SnippetForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
       
    </div>
  );
};

export default SnippetLibrary;
