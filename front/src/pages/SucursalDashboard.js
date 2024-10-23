import React, { useState } from 'react';
import '../assets/SucursalDashboard.css'; 
import Navbar from '../components/Navbar'; 

function Sucursal() {
  const [showVentas, setShowVentas] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [ventas, setVentas] = useState([]);

  // Función para manejar el registro de una nueva venta
  const handleRegistrarVenta = (e) => {
    e.preventDefault();
    const nuevaVenta = {
      id: ventas.length + 1,
      nombreCliente: e.target.nombreCliente.value,
      producto: e.target.producto.value,
      unidades: e.target.unidades.value,
      fechaVenta: e.target.fechaVenta.value,
      metodoPago: e.target.metodoPago.value,
      precioUnitario: e.target.precioUnitario.value,
    };

    setVentas([...ventas, nuevaVenta]);
    setShowRegistro(false); // Oculta el formulario después del registro
  };

  return (
    
    <div className="sucursal-page">
        <Navbar />
      <h1>Sucursal</h1>

      <div className="button-group">
        <button className="btn btn-primary custom-btn" onClick={() => setShowVentas(!showVentas)}>Consultar Ventas</button> &nbsp;
        <button className="btn btn-primary custom-btn" onClick={() => setShowRegistro(!showRegistro)}>Registrar Ventas</button> &nbsp;
        <button className="btn btn-primary custom-btn" onClick={() => alert("Funcionalidad en desarrollo...")}>Generar Informe</button>
      </div>

      {/* Tabla de ventas registradas */}
      {showVentas && (
        <div className="ventas-table">
          <h2>Ventas Registradas</h2>
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
              {ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.nombreCliente}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.unidades}</td>
                  <td>{venta.fechaVenta}</td>
                  <td>{venta.metodoPago}</td>
                  <td>{venta.precioUnitario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulario para registrar una nueva venta */}
      {showRegistro && (
        <div className="registro-form">
          <h2>Registrar Nueva Venta</h2>
          <form onSubmit={handleRegistrarVenta}>
            <div>
              <label>Nombre del Cliente:</label>
              <input type="text" name="nombreCliente" required />
            </div>
            <div>
              <label>Producto:</label>
              <input type="text" name="producto" required />
            </div>
            <div>
              <label>Unidades:</label>
              <input type="number" name="unidades" required />
            </div>
            <div>
              <label>Fecha de Venta:</label>
              <input type="date" name="fechaVenta" required />
            </div>
            <div>
              <label>Método de Pago:</label>
              <select name="metodoPago" required>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
            <div>
              <label>Precio Unitario:</label>
              <input type="number" name="precioUnitario" required />
            </div>
            <button type="submit">Registrar Venta</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Sucursal;
