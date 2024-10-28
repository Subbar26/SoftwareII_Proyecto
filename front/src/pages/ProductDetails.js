import React, { useState } from 'react';
import '../assets/ProductDetails.css';

const ProductDetails = ({ producto, onClose, onAddToCart }) => {
    const [cantidad, setCantidad] = useState(1);

    // Espacio para consumir el servicio de incremento de cantidad
    const incrementarCantidad = () => {
        // Aquí se debería consumir el servicio para incrementar la cantidad en el backend
        setCantidad(cantidad + 1);
    };

    // Espacio para consumir el servicio de disminución de cantidad
    const disminuirCantidad = () => {
        if (cantidad > 1) {
            // Aquí se debería consumir el servicio para disminuir la cantidad en el backend
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="product-image-container">
                    <img src={producto.imagenUrl || "/logo192.png"} alt={producto.nombre} className="product-image" />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{producto.nombre}</h3>
                    <p className="product-description">{producto.descripcion}</p>
                    <p className="product-price">Precio: ${producto.precio}</p>
                    <div className="cantidad-control">
                        <button className="btn btn-outline-secondary" onClick={disminuirCantidad}>-</button>
                        <input type="number" value={cantidad} readOnly className="form-control cantidad-input" />
                        <button className="btn btn-outline-secondary" onClick={incrementarCantidad}>+</button>
                    </div>
                    <button
                        className="btn btn-primary mt-3 w-100"
                        onClick={() => onAddToCart(producto, cantidad)}
                    >
                        Añadir al Carrito
                    </button>
                    <button className="btn btn-danger mt-3 w-100" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
