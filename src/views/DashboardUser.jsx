import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
/* import "./Dashboard.css";  */// Archivo CSS para estilos

const Dashboarduser = () => {
  const { currentUser } = useAuth();
  const [userSnippets, setUserSnippets] = useState([]);

  // Obtener los snippets del usuario autenticado
  useEffect(() => {
    const fetchUserSnippets = async () => {
      if (!currentUser) return;
      
      const q = query(
        collection(db, "snippets"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const snippetsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserSnippets(snippetsData);
    };

    fetchUserSnippets();
  }, [currentUser]);

  return (
    <div className="dashboard">
      <h1>Your Snippets</h1>
      <div className="snippets-list">
        {userSnippets.length > 0 ? (
          userSnippets.map((snippet) => (
            <div className="snippet-card" key={snippet.id}>
              <h2 className="snippet-title">{snippet.title}</h2>
              <pre className="snippet-code">{snippet.code}</pre>
              <p className="snippet-description">{snippet.description}</p>
            </div>
          ))
        ) : (
          <p>No snippets yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboarduser;
