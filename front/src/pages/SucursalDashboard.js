import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import '../assets/SucursalDashboard.css';
import Navbar from '../components/Navbar';
import ProductDetails from '../pages/ProductDetails';

function Sucursal() {
  const [carrito, setCarrito] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8080/api/producto/all')
      .then(response => setProductosDisponibles(response.data))
      .catch(error => console.error("Error al obtener productos desde el backend:", error));

    obtenerVentasEnProceso();
  }, []);

  // Función para obtener las ventas en proceso del cliente y llenar el carrito
  const obtenerVentasEnProceso = async () => {
    const clienteId = localStorage.getItem('userId');
    if (!clienteId) {
      console.error("No se encontró 'userId' en localStorage");
      alert("Error: No se ha encontrado el ID del cliente. Por favor, inicie sesión nuevamente.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/venta/${clienteId}`);
      const ventas = response.data.map(venta => ({
        ventaId: venta.venta_id,
        producto: venta.producto,
        cantidad: venta.cantidad,
        precio: venta.producto.precio,
      }));
      setCarrito(ventas);
      console.log("Ventas en proceso obtenidas:", ventas);
    } catch (error) {
      console.error("Error al obtener las ventas en proceso:", error);
      alert("No se pudieron obtener las ventas en proceso. Por favor, intente nuevamente.");
    }
  };

  // Función para crear o actualizar una venta en el backend
  const crearOActualizarVenta = async (productoId, cantidad) => {
    const clienteId = localStorage.getItem('userId');
    if (!clienteId) {
      console.error("No se encontró 'userId' en localStorage");
      alert("Error: No se ha encontrado el ID del cliente. Por favor, inicie sesión nuevamente.");
      return false;
    }

    const ventaData = {
      productoId: productoId,
      cantidad: cantidad,
      clienteId: clienteId,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/venta/nueva', ventaData);
      console.log('Venta creada o actualizada:', response.data);
      await obtenerVentasEnProceso(); // Actualizar el carrito después de crear/actualizar la venta
      return response.data;
    } catch (error) {
      console.error('Error al crear o actualizar la venta:', error);
      alert("No se pudo crear la venta. Por favor, intente nuevamente.");
      return false;
    }
  };

  const agregarAlCarrito = async (producto, cantidad) => {
    const productoId = producto.producto_id;
    const ventaActualizada = await crearOActualizarVenta(productoId, cantidad);

    if (ventaActualizada) {
      setMostrarCarrito(true);
    }

    cerrarModal();
  };

  // Función para cancelar la venta en el backend
  const cancelarVenta = async (ventaId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/venta/cancelar/${ventaId}`);
      console.log('Venta cancelada:', response.data);
      await obtenerVentasEnProceso(); // Actualizar el carrito después de cancelar la venta
    } catch (error) {
      console.error("Error al cancelar la venta:", error);
      alert("No se pudo cancelar la venta. Por favor, intente nuevamente.");
    }
  };

  // Función llamada cuando se hace clic en "Eliminar" en el carrito
  const eliminarDelCarrito = (ventaId) => {
    if (window.confirm("¿Estás seguro de que deseas cancelar esta venta?")) {
      cancelarVenta(ventaId);
    }
  };

  // Función para crear una factura con las ventas en proceso
  const procesarCompra = async (estado) => {
    const clienteId = localStorage.getItem('userId');
    if (!clienteId) {
      alert("No se encontró el ID del cliente. Por favor, inicie sesión nuevamente.");
      return;
    }

    const facturaData = {
      cliente_id: clienteId,
      fecha_hora: new Date().toISOString(),
      estado: estado,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/factura/nueva', facturaData);
      console.log("Factura creada:", response.data);

      if (estado === "REALIZADO") {
        alert("Compra realizada con éxito.");
      } else if (estado === "CANCELADO") {
        alert("Compra cancelada. Los productos han sido removidos del carrito.");
        setCarrito([]);
        setMostrarCarrito(false);
      }

      await obtenerVentasEnProceso();
    } catch (error) {
      console.error("Error al procesar la factura:", error);
      alert("No se pudo procesar la factura. Intente nuevamente.");
    }
  };

  const cancelarCompra = () => {
    if (window.confirm("¿Estás seguro de que deseas cancelar la compra y vaciar el carrito?")) {
      procesarCompra("CANCELADO");
    }
  };

  const comprar = () => {
    if (window.confirm("¿Deseas proceder con la compra?")) {
      procesarCompra("REALIZADO");
    }
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setCantidad(1);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
  };

  // Función para alternar la visibilidad del carrito
  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <div className="sucursal-page">
      <Navbar />
      {/* Ícono del carrito en la parte superior derecha */}
      <div className="carrito-icono" onClick={toggleCarrito}>
        <i className="fas fa-shopping-cart"></i>
        <span className="carrito-count">{carrito.length}</span>
      </div>
      {productoSeleccionado ? (
        <ProductDetails
          producto={productoSeleccionado}
          onClose={cerrarModal}
          onAddToCart={agregarAlCarrito}
        />
      ) : (
        <div className="container-fluid mt-5">
          <h2 className="text-center mb-4">Productos Disponibles</h2>
          <div className="product-container">
            {productosDisponibles.map((producto) => (
              <div
                className="col"
                key={producto.producto_id}
              >
                <div
                  className="card h-100"
                  onClick={() => abrirModal(producto)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src="/logo192.png" alt={producto.nombre} className="card-img" />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">Precio: ${producto.precio}</p>
                    <p className="card-text">{producto.descripcionCorta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {mostrarCarrito && (
        <div className={`carrito-compras ${mostrarCarrito ? 'carrito-visible' : ''}`}>
          <h2 className="text-center">Carrito de Compras</h2>
          <div className="cart-items">
            {carrito.length === 0 ? (
              <p className="text-center">El carrito está vacío</p>
            ) : (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.ventaId}>
                      <td>{item.producto.nombre}</td>
                      <td>${item.precio}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precio * item.cantidad}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(item.ventaId)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {carrito.length > 0 && (
            <div className="cart-buttons">
              <button className="btn btn-comprar" onClick={comprar}>Comprar</button>
              <button
                className="btn btn-cancelar"
                onClick={cancelarCompra}
              >
                Cancelar Compra
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sucursal;
