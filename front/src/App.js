//import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import GerenteDashboard from './pages/GerenteDashboard';
import SucursalDashboard from './pages/SucursalDashboard';
function App() {
  return(
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={<LoginForm/>}/>
          <Route path='/gerencia' exact element={<GerenteDashboard/>}/>
          <Route path='/sucursal' exact element={<SucursalDashboard/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
