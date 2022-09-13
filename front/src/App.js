/* Dependencies */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullPageLoading from "./components/utils/FullPageLoading";

import PublicLayout from "./components/public/layout/PublicLayout";
import ShopHome from "./components/public/shop";
import Login from "./components/public/login/Login";
import PrivateLayout from "./components/private/layout/PrivateLayout";
import TablaProductos from "./components/private/productos/TablaProductos";
import Preloader from "./components/utils/Preloader";
import CrearProducto from "./components/private/productos/CrearProducto";
import DetallesProducto from "./components/private/producto/DetallesProducto";
import TiendaCompleta from "./components/public/tiendaCompleta/TiendaCompleta";
import ContactoPublic from "./components/public/contacto/ContactoPublic";
import CarritoDetalles from "./components/public/carrito/CarritoDetalles";
import Checkout from "./components/public/checkout/Checkout";
import EditarProducto from "./components/private/productos/EditarProducto";
import EliminarProducto from "./components/private/productos/EliminarProducto";
import TablaNoticias from "./components/private/noticias/TablaNoticias";
import CrearNoticia from "./components/private/noticias/CrearNoticia";
import NoticiasGrid from "./components/public/noticias/NoticiasGrid";
import NoticiaDetalles from "./components/public/noticias/NoticiaDetalles";
import EditarNoticia from "./components/private/noticias/EditarNoticia";
import EliminarNoticia from "./components/private/noticias/EliminarNoticia";

function App() {
  const { currentUser, checkUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      checkUser();
      setLoading(false);
    }, 500);
  });

  const publicRoutes = (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<ShopHome />} />
        <Route path="producto/:id" element={<DetallesProducto />} />
        <Route path="tienda" element={<TiendaCompleta />} />
        <Route path="contacto" element={<ContactoPublic />} />
        <Route path="carrito" element={<CarritoDetalles />} />
        <Route path="pagar" element={<Checkout />} />
        <Route path="noticias" element={<NoticiasGrid />} />
        <Route path="noticias/:id" element={<NoticiaDetalles />} />
        <Route path="*" element={<FullPageLoading />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  const adminRoutes = (
    <Routes>
      <Route path="/" element={<PrivateLayout />}>
        <Route index element={<> Private Layout</>} />
        <Route path="producto" element={<TablaProductos />} />
        <Route path="producto/nuevo" element={<CrearProducto />} />
        <Route path="producto/editar/:id" element={<EditarProducto />} />
        <Route path="producto/eliminar/:id" element={<EliminarProducto />} />
        <Route path="noticias" element={<TablaNoticias />} />
        <Route path="noticias/nuevo" element={<CrearNoticia />} />
        <Route path="noticias/editar/:id" element={<EditarNoticia />} />
        <Route path="noticias/eliminar/:id" element={<EliminarNoticia />} />
        <Route path="*" element={<Preloader />} />
      </Route>
    </Routes>
  );

  const getRoute = () => {
    if (loading) {
      return (
        <Routes>
          <Route path="/" element={<FullPageLoading />} />
        </Routes>
      );
    }

    if (!currentUser) return publicRoutes;

    if (currentUser) {
      return adminRoutes;
    }
  };

  return (
    <>
      <BrowserRouter>{getRoute()}</BrowserRouter>
    </>
  );
}

export default App;
