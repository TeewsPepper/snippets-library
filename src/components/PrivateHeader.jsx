import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./PrivateHeader.css";

const PrivateHeader = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  return (
    <>
      <header>
        <nav>
          <h1 className="logo">SLApp</h1>
          <input type="text" placeholder="buscar" />
          <button><Link to="/library">Add</Link></button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>
    </>
  );
};

export default PrivateHeader;
