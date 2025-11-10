import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

export default function Buzos() {
  const buzos = productos.filter((p) => p.categoria === "buzos");

  return (
    <main className="productos-contenedor">
      <h2 className="productos-titulo">Buzos</h2>
      <div className="productos-grid">
        {buzos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
