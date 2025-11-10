import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

export default function Remeras() {
  const remeras = productos.filter((p) => p.categoria === "remeras");

  return (
    <main className="productos-contenedor">
      <h2 className="productos-titulo">Remeras</h2>
      <div className="productos-grid">
        {remeras.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
