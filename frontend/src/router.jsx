import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Remeras from "./pages/Remeras";
import Buzos from "./pages/Buzos";
import Pantalones from "./pages/Pantalones";
import Zapatillas from "./pages/Zapatillas";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./components/Carrito";
import Checkout from "./pages/Checkout";

export default function Router() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/remeras" element={<Remeras />} />
          <Route path="/buzos" element={<Buzos />} />
          <Route path="/pantalones" element={<Pantalones />} />
          <Route path="/zapatillas" element={<Zapatillas />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}
