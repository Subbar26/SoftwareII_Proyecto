import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LoginForm() {
  const [username, setUsername] = useState(''); // Cambiado a nombre de usuario
  const [contrasena, setContrasena] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: username,  // Usamos el nombre de usuario en lugar de correo
        password: contrasena
      });

      const { token, id } = response.data;
      // Guarda el token y el id en el almacenamiento local
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);

      // Redirige siempre a /sucursal porque el rol es CLIENTE
      navigate("/sucursal");
    } catch (error) {
      setLoginError('Nombre de usuario o contraseña incorrectos');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
