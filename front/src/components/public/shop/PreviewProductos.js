import React from "react";
import { useNavigate } from "react-router-dom";

const PreviewProductos = () => {
  const navigate = useNavigate();

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="filter__controls">
              <li className="active" data-filter="*">
                Los más vendidos
              </li>
              <li data-filter=".new-arrivals">Lo mas nuevo</li>
              <li data-filter=".hot-sales">En oferta</li>
            </ul>
          </div>
        </div>
        <div className="row product__filter">
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-1.jpg"
                >
                  <span className="label">New</span>
                </div>
                <div className="product__item__text">
                  <h6>Calzado para caballero</h6>
                  <h5>$67.24</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-2.jpg"
                />
                <div className="product__item__text">
                  <h6>Abrigo para dama</h6>
                  <h5>$67.24</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-3.jpg"
                >
                  <span className="label">Sale</span>
                </div>
                <div className="product__item__text">
                  <h6>Tenis casual negro</h6>
                  <h5>$43.48</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-4.jpg"
                />
                <div className="product__item__text">
                  <h6>Chamarra para caballero</h6>
                  <h5>$60.9</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-5.jpg"
                />
                <div className="product__item__text">
                  <h6>Playera negra exterior</h6>
                  <h5>$31.37</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-6.jpg"
                >
                  <span className="label">Sale</span>
                </div>
                <div className="product__item__text">
                  <h6>Fubanda gris</h6>
                  <h5>$98.49</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-7.jpg"
                />
                <div className="product__item__text">
                  <h6>Mochila cafe outdoor</h6>
                  <h5>$49.66</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
            <a onClick={() => navigate("/tienda")}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-8.jpg"
                />
                <div className="product__item__text">
                  <h6>Playera azul exterior</h6>
                  <h5>$26.28</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <center>
        <div className="blog__item">
          <div className="blog__item__text">
            <a onClick={() => navigate("/tienda")} >Ver mas</a>
          </div>
        </div>
      </center>
    </section>
  );
};

export default PreviewProductos;
