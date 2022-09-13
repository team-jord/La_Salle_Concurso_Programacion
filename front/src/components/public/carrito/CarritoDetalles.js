import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import DetallesProductoRenglon from "./DetallesProductoRenglon";

const CarritoDetalles = () => {
  const navigate = useNavigate();
  const { isEmpty, items, emptyCart } = useCart();
  let total = 0;
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Carrito de compras</h4>
                <div className="breadcrumb__links">
                  <a href="#/" onClick={() => navigate("/")}>
                    Inicio
                  </a>
                  <a href="#/" onClick={() => navigate("tienda")}>
                    Tienda
                  </a>
                  <span>Carrito de compras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Shopping Cart Section Begin */}
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((record, index) => {
                      total +=record.itemTotal;
                      return (
                        <DetallesProductoRenglon key={index} data={record} />
                      );
                    })}
                    {/* <tr>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img src="img/shopping-cart/cart-1.jpg" alt="" />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>T-shirt Contrast Pocket</h6>
                          <h5>$98.49</h5>
                        </div>
                      </td>
                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input type="text" defaultValue={1} />
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">$ 30.00</td>
                      <td className="cart__close">
                        <i className="fa fa-close" />
                      </td>
                    </tr>
                    <tr>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img src="img/shopping-cart/cart-2.jpg" alt="" />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>Diagonal Textured Cap</h6>
                          <h5>$98.49</h5>
                        </div>
                      </td>
                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input type="text" defaultValue={1} />
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">$ 32.50</td>
                      <td className="cart__close">
                        <i className="fa fa-close" />
                      </td>
                    </tr>
                    <tr>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img src="img/shopping-cart/cart-3.jpg" alt="" />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>Basic Flowing Scarf</h6>
                          <h5>$98.49</h5>
                        </div>
                      </td>
                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input type="text" defaultValue={1} />
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">$ 47.00</td>
                      <td className="cart__close">
                        <i className="fa fa-close" />
                      </td>
                    </tr>
                    <tr>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img src="img/shopping-cart/cart-4.jpg" alt="" />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>Basic Flowing Scarf</h6>
                          <h5>$98.49</h5>
                        </div>
                      </td>
                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input type="text" defaultValue={1} />
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">$ 30.00</td>
                      <td className="cart__close">
                        <i className="fa fa-close" />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a href="#/" onClick={() => navigate("/tienda")}>Continuar comprando</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* <div className="cart__discount">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Coupon code" />
                  <button type="submit">Apply</button>
                </form>
              </div> */}
              <div className="cart__total">
                <h6>Total del carrito</h6>
                <ul>
                  <li>
                    Subtotal <span>$ {total.toFixed(2)}</span>
                  </li>
                  <li>
                    Costo envio <span>$ 150</span>
                  </li>
                  <li>
                    Total <span>$ {(total+150).toFixed(2)}</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn" onClick={() => navigate("/pagar")}>
                  Ir a pagar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shopping Cart Section End */}
    </>
  );
};

export default CarritoDetalles;
