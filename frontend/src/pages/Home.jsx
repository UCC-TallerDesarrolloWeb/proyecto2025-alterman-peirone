import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-contenido">
          <h1>CrewLab</h1>
          <p>Indumentaria urbana</p>
          <Link to="/productos" className="btn-primario">Ver productos</Link>
        </div>
      </section>
    </main>
  );
}
