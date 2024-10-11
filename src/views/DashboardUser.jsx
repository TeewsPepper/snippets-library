import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import SnippetList from "./SnippetList"; // Importar SnippetList

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
      {/* Pasar los snippets y el currentUserId al componente SnippetList */}
      {currentUser && (
        <SnippetList snippets={userSnippets} currentUserId={currentUser.uid} />
      )}
    </div>
  );
};

export default Dashboarduser;
