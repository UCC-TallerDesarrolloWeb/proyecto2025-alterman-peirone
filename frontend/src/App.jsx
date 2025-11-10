import Header from "./components/Header";
import { CarritoProvider } from "./context/CarritoContext";
import "./styles/style.css";

export default function App({ children }) {
  return (
    <CarritoProvider>
      <Header />
      <main className="app-contenido">{children}</main>
    </CarritoProvider>
  );
}
