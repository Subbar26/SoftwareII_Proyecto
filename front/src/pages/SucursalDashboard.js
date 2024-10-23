import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../assets/SucursalDashboard.css'; 

const productosDisponibles = [
  { id: 1, nombre: 'Producto A', precio: 100 },
  { id: 2, nombre: 'Producto B', precio: 200 },
  { id: 3, nombre: 'Producto C', precio: 300 },
  // Agrega más productos si es necesario
];

function Sucursal() {
  const [carrito, setCarrito] = useState([]);

  // Función para añadir un producto al carrito
  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (productoEnCarrito) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Función para ajustar la cantidad de un producto en el carrito
  const ajustarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter((item) => item.id !== productoId));
  };

  // Función para manejar la compra
  const manejarCompra = () => {
    alert('Compra realizada con éxito');
    setCarrito([]); // Limpiar el carrito después de la compra
  };

  // Función para cancelar la compra
  const cancelarCompra = () => {
    setCarrito([]); // Limpiar el carrito
  };

  return (
    <div className="sucursal-page">
      <Navbar /> {/* Navbar en la parte superior */}
      <h1>Sucursal</h1>

      {/* Tabla de productos disponibles */}
      <div className="productos-disponibles">
        <h2>Productos Disponibles</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Añadir al Carrito</th>
            </tr>
          </thead>
          <tbody>
            {productosDisponibles.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>
                  <button className="btn btn-primary custom-btn" onClick={() => agregarAlCarrito(producto)}>Añadir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Carrito de compras */}
      <div className="carrito-compras">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                    <input
                      type="number"
                      value={item.cantidad}
                      onChange={(e) => ajustarCantidad(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="acciones-carrito">
          <button className="btn btn-success" onClick={manejarCompra} disabled={carrito.length === 0}>
            Comprar
          </button>&nbsp;
          <button className="btn btn-warning" onClick={cancelarCompra} disabled={carrito.length === 0}>
            Cancelar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sucursal;

