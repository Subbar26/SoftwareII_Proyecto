import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">Registro de inventarios</Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">Cerrar Sesión</Link>
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
