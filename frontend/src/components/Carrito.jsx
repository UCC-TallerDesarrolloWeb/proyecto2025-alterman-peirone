import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function Carrito() {
  const {
    carrito, sumarCantidad, restarCantidad,
    eliminarProducto, vaciarCarrito, total
  } = useCarrito();

  if (carrito.length === 0) {
    return (
      <main className="carrito-vacio">
        <h2>El carrito está vacío</h2>
        <Link to="/productos" className="btn-volver">Ver productos</Link>
      </main>
    );
  }

  return (
    <main className="carrito-contenedor">
      <h2 className="carrito-titulo">Mi Carrito</h2>

      <div className="carrito-lista">
        {carrito.map((item) => (
          <div key={item.id} className="carrito-item">
            <img src={item.img} alt={item.nombre} className="carrito-imagen" />
            <div className="carrito-info">
              <h3>{item.nombre}</h3>
              <p className="carrito-precio">Precio: ${item.precio}</p>

              <div className="carrito-cantidad">
                <button onClick={() => restarCantidad(item.id)} className="btn-cantidad">-</button>
                <span className="cantidad-numero">{item.cantidad}</span>
                <button onClick={() => sumarCantidad(item.id)} className="btn-cantidad">+</button>
              </div>

              <button className="btn-eliminar" onClick={() => eliminarProducto(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
        <h3>Total:</h3>
        <p className="carrito-total">${total}</p>
        <button className="btn-vaciar" onClick={vaciarCarrito}>Vaciar carrito</button>
        <Link to="/checkout" className="btn-finalizar">Finalizar compra</Link>
      </div>
    </main>
  );
}
