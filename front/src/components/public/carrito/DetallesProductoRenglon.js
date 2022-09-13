import React, { useEffect, useState } from "react";
import ProductoService from "../../../services/Producto.service";
import S3Service from "../../../services/S3.services";
import { useCart } from "react-use-cart";

const DetallesProductoRenglon = ({ data }) => {
  const { removeItem } = useCart();
  const [state, setState] = useState(JSON.parse(data.name));

  const getData = async () => {
    try {
      const result = await ProductoService.getById(state.id);
      const dataImage = await S3Service.get(result.imagenes[0]);
      const image = document.querySelector(`#data${data.id}`);
      image.src = dataImage.result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <tr>
      <td className="product__cart__item">
        <div className="product__cart__item__pic">
          <img
            id={`data${data.id}`}
            src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/circular_progress_indicator_square_small.gif"
            style={{ width: "90px", height: "90px" }}
          />
        </div>
        <div className="product__cart__item__text">
          <h6>
            {state.nombre} {state.talla}{" "}
          </h6>
          <h5>${data.price.toFixed(2)}</h5>
        </div>
      </td>
      <td className="quantity__item">
        <div className="quantity">
          <div className="pro-qty-2">
            <input type="text" value={data.quantity} />
          </div>
        </div>
      </td>
      <td className="cart__price">$ {data.itemTotal.toFixed(2)}</td>
      <td className="cart__close">
        <i className="fa fa-close" onClick={() => removeItem(data.id)} />
      </td>
    </tr>
  );
};

export default DetallesProductoRenglon;
