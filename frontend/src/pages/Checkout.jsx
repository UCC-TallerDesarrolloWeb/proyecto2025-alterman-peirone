import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { carrito, total, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [compraRealizada, setCompraRealizada] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validarFormulario = () => {
    if (!form.nombre || !form.email || !form.direccion || !form.telefono) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    setError("");
    return true;
  };

  const confirmarCompra = () => {
    if (!validarFormulario()) return;
    vaciarCarrito();
    setCompraRealizada(true);
    setTimeout(() => navigate("/"), 2500);
  };

  if (carrito.length === 0 && !compraRealizada) {
    return (
      <main className="checkout-vacio">
        <h2>No hay productos en el carrito.</h2>
        <button onClick={() => navigate("/productos")} className="btn-volver">
          Ver productos
        </button>
      </main>
    );
  }

  return (
    <main className="checkout-contenedor">
      <h2 className="checkout-titulo">Finalizar Compra</h2>

      <div className="checkout-flex">
        <section className="checkout-form">
          <h3>Datos del comprador</h3>
          <input type="text" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
          <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
          <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          {error && <p className="checkout-error">{error}</p>}
          <button className="btn-finalizar" onClick={confirmarCompra}>Confirmar compra</button>
          {compraRealizada && <p className="checkout-exito">Compra realizada con éxito. Gracias por tu compra.</p>}
        </section>

        <section className="checkout-resumen">
          <h3>Resumen del pedido</h3>
          <ul className="checkout-lista">
            {carrito.map((item) => (
              <li key={item.id} className="checkout-item">
                <span>{item.nombre}</span>
                <span>x {item.cantidad}</span>
                <span>${(item.precio * item.cantidad)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout-total">Total: <strong>${total}</strong></p>
        </section>
      </div>
    </main>
  );
}
