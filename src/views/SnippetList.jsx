import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./SnippetList.css";

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);  // Estado de carga

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

  return (
    <div className="snippets-list-container">
      <h1>Snippet List</h1>
      
      {/* Lista de snippets */}
      <div className="snippets-list">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
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
