import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./SnippetList.css";
import Select from "react-select"; // Importamos react-select

const SnippetList = ({ currentUserId }) => { 
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // Estado para manejar el filtro

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
    return <div className="loader"></div>;  // Loader mientras carga
  }

  // Manejar el cambio del filtro
  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption.value); 
  };

  // Filtrar los snippets según el filtro seleccionado
  const filteredSnippets = snippets.filter(snippet => {
    if (filter === 'mine') {
      return snippet.userId === currentUserId; // Solo los snippets del usuario actual
    }
    return true; // Todos los snippets si el filtro es 'all'
  });

  // Opciones de filtro para react-select
  const filterOptions = [
    { value: 'all', label: 'All Snippets' },
    { value: 'mine', label: 'My Snippets' }
  ];

  return (
    <div className="snippets-list-container">
      <h1>Snippet List</h1>

      {/* Selector de filtro usando react-select */}
      <Select 
        defaultValue={filterOptions[0]}
        onChange={handleFilterChange}
        options={filterOptions}
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
