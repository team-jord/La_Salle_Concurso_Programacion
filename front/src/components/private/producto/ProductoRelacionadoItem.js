import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import S3Service from "../../../services/S3.services";

const ProductoRelacionadoItem = ({
  id,
  nombre,
  precio,
  descuento,
  imagenes,
}) => {
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

  const navegar = () => {
    try {
      navigate(`/producto/${id}`);
      
      window.location.reload();

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div class="col-lg-3 col-md-6 col-sm-6 col-sm-6">
      <a onClick={() => navegar()}>
        <div class="product__item sale">
          <div
            id={`imagenProducto${id}`}
            class="product__item__pic set-bg"
            data-setbg="img/product/product-3.jpg"
            style={{
              // backgroundImage: "url(/img/product/product-2.jpg)",
              backgroundImage: `url(${imagen})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div class="product__item__text">
            <h6>{nombre}</h6>

            <h5>${precioFinal.toFixed(2)}</h5>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductoRelacionadoItem;
