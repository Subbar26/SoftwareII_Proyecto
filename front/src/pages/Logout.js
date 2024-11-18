// src/components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token y el id de usuario de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Redirigir al usuario a la página de inicio o login
    navigate('/'); // Cambia a la ruta que prefieras después del logout
  }, [navigate]);

  return null; // No necesitamos renderizar nada en este componente
};

export default Logout;
