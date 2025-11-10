import { Link, NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const { cantidadTotal } = useCarrito();

  return (
    <header className="header">
      <div className="header-contenedor">
        <Link to="/" className="header-logo">CrewLab</Link>

        <nav className="nav">
          <NavLink to="/remeras" className="nav-link">Remeras</NavLink>
          <NavLink to="/buzos" className="nav-link">Buzos</NavLink>
          <NavLink to="/pantalones" className="nav-link">Pantalones</NavLink>
          <NavLink to="/zapatillas" className="nav-link">Zapatillas</NavLink>
          <NavLink to="/productos" className="nav-link">Todos</NavLink>
        </nav>

        <Link to="/carrito" className="carrito-icono">
          <span className="material-icons">shopping_cart</span>
          {cantidadTotal > 0 && <span className="carrito-contador">{cantidadTotal}</span>}
        </Link>
      </div>
    </header>
  );
}
