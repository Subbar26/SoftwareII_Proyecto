//import logo from './logo.svg';
import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GerenteDashboard from './pages/GerenteDashboard';
import LoginForm from './pages/LoginForm';
import Logout from './pages/Logout';
import SucursalDashboard from './pages/SucursalDashboard';
function App() {
  return(
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<LoginForm/>}/>
          <Route path='/gerencia' exact element={<GerenteDashboard/>}/>
          <Route path='/sucursal' exact element={<SucursalDashboard/>}/>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
