import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import S3Service from "../../../services/S3.services";

const ItemProductoGrid = ({ id, nombre, precio, descuento, imagenes }) => {
  const navigate = useNavigate();
  let precioFinal = precio;

  let imagen =
    "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/circular_progress_indicator_square_small.gif";
  if (descuento > 0) {
    const descuentoProps = descuento;
    const precioOriginal = precio;
    precioFinal = precioOriginal - 100 / (precioOriginal / descuentoProps);
  }

  useEffect(() => {
    if (imagenes.length > 0) {
      getImagen();
    }
  }, []);

  const getImagen = async () => {
    try {
      const result = await S3Service.get(imagenes[0]);
      imagen = result.result;
      const image = document.querySelector(`#imagenProducto${id}`);
      image.style.backgroundImage = `url(${imagen})`;
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <a onClick={() => navigate(`/producto/${id}`)}>
        <div className="product__item">
          <div
            id={`imagenProducto${id}`}
            className="product__item__pic set-bg"
            data-setbg={imagen}
            style={{
              // backgroundImage: "url(/img/product/product-2.jpg)",
              backgroundImage: `url(${imagen})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="product__item__text">
            <h6>{nombre}</h6>

            <h5>${precioFinal.toFixed(2)}</h5>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ItemProductoGrid;
