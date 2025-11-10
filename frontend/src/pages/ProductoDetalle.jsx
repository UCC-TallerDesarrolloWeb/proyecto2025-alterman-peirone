import { useParams } from "react-router-dom";
import { productos } from "../data/productos";

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</h2>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.contenido}>
        <img src={producto.img} alt={producto.nombre} style={styles.imagen} />
        <div style={styles.info}>
          <h1>{producto.nombre}</h1>
          <h2>${producto.precio}</h2>
          <p>{producto.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  contenido: { display: "flex", gap: "40px", alignItems: "center" },
  imagen: { width: "450px", borderRadius: "6px" },
  info: { flex: 1 },
};
