import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductoCard({ producto }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const imagenPrincipal = producto.img;
  const imagenSecundaria = producto.imagenes_adicionales?.[0] || producto.img;

  return (
    <div
      className="producto-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/producto/${producto.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={hover ? imagenSecundaria : imagenPrincipal}
        alt={producto.nombre}
        className="producto-imagen"
      />
      <h3 className="producto-nombre">{producto.nombre}</h3>
      <p className="producto-precio">${producto.precio}</p>
    </div>
  );
}
