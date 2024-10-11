import React from "react";
import { Link } from "react-router-dom";
import './SnippetForm.css'

const SnippetForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="snippet-form" onSubmit={handleSubmit}>
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

