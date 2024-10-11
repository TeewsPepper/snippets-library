import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'; // Importa DOMPurify
import './SnippetForm.css';

const SnippetForm = ({ formData, handleChange, handleSubmit }) => {
  const sanitizeInput = (data) => {
    return {
      title: DOMPurify.sanitize(data.title), // Sanitiza el título
      code: DOMPurify.sanitize(data.code),   // Sanitiza el código
      description: DOMPurify.sanitize(data.description), // Sanitiza la descripción
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizeInput(formData); // Sanitiza los datos
    handleSubmit(sanitizedData); // Envía los datos sanitizados
  };

  return (
    <form className="snippet-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Snippet Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="code"
        placeholder="Your Code"
        value={formData.code}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Save Snippet</button>
      <button><Link className="enlace" to="/library/snippets">Snippet List</Link></button>
    </form>
  );
};

export default SnippetForm;


