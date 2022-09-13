import { useState } from "react";
import { useCart } from "react-use-cart";

const TallasComponent = ({ tallas, id, nombre, precio }) => {
  const { addItem, items } = useCart();
  const [value, setValue] = useState(1);
  const [active, setActive] = useState(0);
  const [max, setMax] = useState(tallas[0].cantidad);
  const [min, setMin] = useState(1);
  const [producto, setProducto] = useState({});

  const setCantidad = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  const setCantidadMaxima = (cantidad, index) => {
    setMax(cantidad);
    setActive(index);
    setValue(1);
  };

  const agregarProducto = () => {
    const nombreObject = {
      id: id,
      nombre: nombre,
      talla: tallas[active].talla,
      cantidad: value,
    };
    const producto = {
      id: active + 1,
      name: JSON.stringify(nombreObject),
      price: precio,
      quantity: value,
    };
    addItem(producto, value);
  };

  return (
    <>
      <div className="product__details__option">
        <div className="product__details__option__size">
          <span>Tallas:</span>

          {tallas.map((record, index) => {
            return (
              <label
                className={`${active === index && "active"}`}
                onClick={() => setCantidadMaxima(record.cantidad, index)}
              >
                {record.talla}
                <input type="radio" id="xxl" />
              </label>
            );
          })}
        </div>
      </div>
      <div className="product__details__cart__option">
        <div className="quantity">
          <div className="pro-qty">
            <input type="number" value={value} onChange={setCantidad} />
          </div>
        </div>
        <br />
        <br />
        <a href="#/" className="primary-btn" onClick={() => agregarProducto()}>
          Agregar al carrito
        </a>
      </div>
    </>
  );
};

export default TallasComponent;
