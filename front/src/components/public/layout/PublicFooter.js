import React from "react";

const PublicFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
      <div className="row">
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="footer__about">
      <div className="footer__logo">
        <a href="#">
          <img src="LogoOf.png" alt="" />
        </a>
      </div>
      <p>
        Estamos dedicados a los más altos estándares de servicio al cliente.
      </p>
      <a href="#">
        <img src="img/payment.png" alt="" />
      </a>
    </div>
  </div>
  <div className="col-lg-4 offset-lg-1 col-md-3 col-sm-6">
    <div className="footer__widget">
      <h6>Tienda</h6>
      <ul>
        <li>
          <a href="./shop.html">Tienda</a>
        </li>
        <li>
          <a href="./shop.html">Colección caballeros</a>
        </li>
        <li>
          <a href="./shop.html">Colección damas</a>
        </li>
        <li>
          <a href="./shop.html">Ofertas</a>
        </li>
      </ul>
    </div>
  </div>
  <div className="col-lg-3 col-md-3 col-sm-6">
    <div className="footer__widget">
      <h6>Acerca de</h6>
      <ul>
        <li>
          <a href="./contact.html">Contacto</a>
        </li>
        <li>
          <a href="./about.html">Acerca de</a>
        </li>
        <li>
          <a href="./blog.html">Blog</a>
        </li>
        <li>
          <a href="./index.html">Inicio</a>
        </li>
      </ul>
    </div>
  </div>
</div>

        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="footer__copyright__text">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              <p>
                Copyright © 2022 All rights reserved | Desarrollado por{" "}
                <a href="http://www.karimnot.com/" target="_blank">
                  Karimnot
                </a>
              </p>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
