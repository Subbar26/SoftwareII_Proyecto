import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = sessionStorage.getItem('id_user');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
  
    const handleLogout = () => {
      sessionStorage.removeItem('id_user');
      sessionStorage.removeItem('name_user');
      setIsLoggedIn(false);
    };
  
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand">
              Registro de inventarios
            </Link>
            
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link to={"/perfil"} className="nav-link">Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={handleLogout} to={"/"}>Cerrar Sesión</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                    <Link to={"/acercaDe"} className="nav-link">Acerca de</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/"} className="nav-link">Iniciar Sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/registro"} className="nav-link">Registro</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
  }
  
  export default Navbar;