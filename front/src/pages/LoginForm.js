import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 

function LoginForm() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [user, setUser] = useState('gerencia'); // Iniciar con un valor predeterminado
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    if (user === "gerencia") {
      navigate("/gerencia");
    } else {
      navigate("/sucursal");
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo_electronico"
            value={"aaa@gmail.com"}//correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={"123"}//contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo de Usuario:</label>
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)} // Actualizar el estado cuando se seleccione una opción
          >
            <option value="gerencia">Gerencia</option>
            <option value="sucursal">Sucursal</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;

