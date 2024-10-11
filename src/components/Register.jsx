import React from "react";


const Register = () => {
  return (
    <>
      
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value="" />

        <label htmlFor="username">Nombre:</label>
        <input type="text" id="username" name="username" value="" />

        <label htmlFor="password">Clave:</label>
        <input type="password" id="password" name="password" value="" />

        <button type="submit">Enviar</button>
      </form>
      
    </>
  );
};

export default Register;
