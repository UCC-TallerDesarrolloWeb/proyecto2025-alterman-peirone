import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

export default function Zapatillas() {
  const zapatillas = productos.filter((p) => p.categoria === "zapatillas");

  return (
    <main className="productos-contenedor">
      <h2 className="productos-titulo">Zapatillas</h2>
      <div className="productos-grid">
        {zapatillas.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}
