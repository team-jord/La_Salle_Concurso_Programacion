import React from "react";
import PreviewProductos from "./PreviewProductos";
import CategoriasInicio from "./CategoriasInicio";
import Carrusel from "./Carrusel";
import Noticias from "./Noticias";

const ShopHome = () => {
  return (
    <>
      <Carrusel />
      <CategoriasInicio />
      <PreviewProductos />
      <Noticias />
    </>
  );
};

export default ShopHome;
