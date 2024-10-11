import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Select from 'react-select';
import "./SnippetList.css";

const SnippetList = ({ currentUserId }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [filter, setFilter] = useState({ value: 'all', label: 'All Snippets' }); // Estado para manejar el filtro

  // Obtener los snippets de Firestore
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "snippets"));
        const snippetsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSnippets(snippetsData);
      } catch (error) {
        console.error("Error al obtener los snippets: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return <div className="loader"></div>; // Loader mientras carga
  }

  // Manejar el cambio del filtro
  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption); // Cambiar el filtro según la selección
  };

  // Filtrar los snippets según el filtro seleccionado
  const filteredSnippets = snippets.filter(snippet => {
    if (filter.value === 'mine') {
      return snippet.userId === currentUserId; // Solo los snippets del usuario actual
    }
    return true; // Todos los snippets si el filtro es 'all'
  });

  // Opciones para el filtro
  const filterOptions = [
    { value: 'all', label: 'All Snippets' },
    { value: 'mine', label: 'My Snippets' },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '5rem', // Altura mínima del control
      
      boxShadow: 'none',
      
      fontFamily: 'Courier Prime, monospace', // Fuente personalizada
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e6e6e6' : '#fff', // Color de fondo al pasar el mouse
      color: state.isFocused ? '#000' : '#333', // Color del texto al pasar el mouse
      padding: '10px', // Espaciado interno de las opciones
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 100, // Asegúrate de que el menú esté encima de otros elementos
      fontSize: '2rem', // Aumenta el tamaño de la fuente aquí
      fontFamily: 'Courier Prime, monospace', // Aplica la fuente aquí
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa', // Color del placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333', // Color del texto seleccionado
      
    
    }),
  };

  return (
    <div className="snippets-list-container">
      <h1>Snippet List</h1>
      
      {/* Selector de filtro usando React Select */}
      <label htmlFor="filter">Filter:</label>
      <Select
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        options={filterOptions}
        styles={customStyles}
      />

      {/* Lista de snippets */}
      <div className="snippets-list">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <div className="snippet-card" key={snippet.id}>
              <h2 className="snippet-title">{snippet.title}</h2>
              <pre className="snippet-code">{snippet.code}</pre>
              <p className="snippet-description">{snippet.description}</p>
            </div>
          ))
        ) : (
          <p>No snippets found.</p>
        )}
      </div>
      
    </div>
  );
};

export default SnippetList;
