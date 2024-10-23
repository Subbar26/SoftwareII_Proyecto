import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../assets/GerenteDashboard.css'; 

function Gerencia() {
  const [showVentas, setShowVentas] = useState(false);
  const [showInforme, setShowInforme] = useState(false);
  const [sucursal, setSucursal] = useState('sucursal1'); // Estado para el select del informe

  return (
    <div className="gerencia-page">
      <Navbar /> {/* Navbar en la parte superior */}

      <h1>Gerencia</h1>

      <div className="button-group">
        <button className="btn btn-primary custom-btn" onClick={() => setShowVentas(!showVentas)}>Ver Ventas por Sucursal</button>&nbsp;
        <button className="btn btn-primary custom-btn" onClick={() => setShowInforme(!showInforme)}>Generar Informe</button>
      </div>

      {/* Tablas de ventas por sucursal */}
      {showVentas && (
        <div className="ventas-sucursales">
          <h2>Ventas por Sucursal</h2>
          <div className="sucursal-ventas">
            <h3>Sucursal 1</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Unidades</th>
                  <th>Fecha</th>
                  <th>Método de Pago</th>
                  <th>Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí se llenarán los datos más adelante */}
              </tbody>
            </table>
          </div>

          <div className="sucursal-ventas">
            <h3>Sucursal 2</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Unidades</th>
                  <th>Fecha</th>
                  <th>Método de Pago</th>
                  <th>Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí se llenarán los datos más adelante */}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Formulario para generar informe */}
      {showInforme && (
        <div className="generar-informe">
          <h2>Generar Informe</h2>
          <form>
            <div>
              <label>Seleccionar Sucursal:</label>
              <select value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
                <option value="sucursal1">Sucursal 1</option>
                <option value="sucursal2">Sucursal 2</option>
              </select>
            </div>
            <button type="button" onClick={() => alert(`Generando informe para ${sucursal}`)}>
              Generar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Gerencia;
