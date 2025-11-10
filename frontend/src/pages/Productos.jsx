import { Link } from "react-router-dom";
import { productos } from "../data/productos";

export default function Productos() {
  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Productos</h1>

      <div style={styles.grid}>
        {productos.map((prod) => (
          <Link
            to={`/producto/${prod.id}`}
            key={prod.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.card}>
              <img src={prod.img} alt={prod.nombre} style={styles.imagen} />
              <h3 style={styles.nombre}>{prod.nombre}</h3>
              <p style={styles.precio}>${prod.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" },
  titulo: { textAlign: "center", marginBottom: "40px", fontSize: "32px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" },
  card: { border: "1px solid #ddd", padding: "15px", borderRadius: "6px", textAlign: "center" },
  imagen: { width: "100%", height: "auto", marginBottom: "15px" },
  nombre: { fontSize: "18px", marginBottom: "10px" },
  precio: { fontSize: "20px", fontWeight: "bold" },
};
