import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";

const PublicHeader = () => {
  const navigate = useNavigate();
  const { totalUniqueItems, cartTotal } = useCart();

  const handleClick = () => {
    let element1;
    element1 = document.querySelector("#menuoverlay1");

    let element2;
    element2 = document.querySelector("#menuoverlay2");

    if (element1) {
      element1.className = "offcanvas-menu-overlay";
      element2.className = "offcanvas-menu-wrapper";
    }
  };

  const [active, setActive] = useState("");

  useEffect(() => {
    let url = window.location.href;

    if (url.includes("tienda")) {
      setActive("tienda");
    } else if (url.includes("pagos")) {
      setActive("tienda");
    } else if (url.includes("producto")) {
      setActive("tienda");
    } else {
      setActive("");
    }
  }, []);

  const navegar = (url) => {
    try {
      navigate(`/${url}`);
      setActive(url);
    } catch (error) {
      toast.error(error);
    }
  };

  const burgerMenu = () => {
    let element1;
    element1 = document.querySelector(".offcanvas-menu-overlay");

    let element2;
    element2 = document.querySelector(".offcanvas-menu-wrapper");

    if (element1) {
      element1.className = "offcanvas-menu-overlay active";
      element2.className = "offcanvas-menu-wrapper active";
    }
  };

  return (
    <>
      <div>
        <div
          id="menuoverlay1"
          className="offcanvas-menu-overlay"
          onClick={() => handleClick()}
        ></div>
        <div id="menuoverlay2" className="offcanvas-menu-wrapper">
          <div className="offcanvas__option">
            <div className="offcanvas__links">
              <a onClick={() => navegar("login")}>Inicia sesión</a>
              <a href="#">Acerca de</a>
            </div>
          </div>
          <div className="offcanvas__nav__option">
            <a href="#" className="search-switch">
              <img src="/img/icon/search.png" alt="" />
            </a>

            <a onClick={() => navegar("carrito")}>
              <img src="/img/icon/cart.png" alt="" />{" "}
              <span>{totalUniqueItems}</span>
            </a>
            <div className="price">${cartTotal.toFixed(2)}</div>
          </div>
          <div id="mobile-menu-wrap">
            <div className="slicknav_menu">
              <a
                href="#"
                aria-haspopup="true"
                role="button"
                tabIndex={0}
                className="slicknav_btn slicknav_collapsed"
                style={{ outline: "none" }}
              >
                <span className="slicknav_menutxt">MENU</span>
                <span className="slicknav_icon">
                  <span className="slicknav_icon-bar" />
                  <span className="slicknav_icon-bar" />
                  <span className="slicknav_icon-bar" />
                </span>
              </a>
              <nav
                className="slicknav_nav slicknav_hidden"
                aria-hidden="true"
                role="menu"
                style={{ display: "none" }}
              >
                <ul>
                  <li className={` ${active === "" && "active"}`}>
                    <a onClick={() => navegar("")} role="menuitem">
                      Inicio
                    </a>
                  </li>
                  <li className={` ${active === "tienda" && "active"}`}>
                    <a
                      href="#/"
                      onClick={() => navegar("tienda")}
                      role="menuitem"
                    >
                      Tienda
                    </a>
                  </li>

                  <li className={` ${active === "noticias" && "active"}`}>
                    <a onClick={() => navegar("noticias")} role="menuitem">
                      Noticias
                    </a>
                  </li>
                  <li>
                    <a
                      href="#/"
                      onClick={() => navegar("contacto")}
                      role="menuitem"
                    >
                      Contacto
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="offcanvas__text">
            <p>Envío gratis y atencion al cliente las 24 hrs.</p>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                  <p>Envío gratis y atencion al cliente las 24 hrs.</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                  <div className="header__top__links">
                    <a onClick={() => navegar("login")}>Inicia sesión</a>
                    <a href="#">Acerca de</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
                <a onClick={() => navegar("")}>
                  <img src="/LogoOf.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className={` ${active === "" && "active"}`}>
                    <a onClick={() => navegar("")}>Inicio</a>
                  </li>
                  <li className={` ${active === "tienda" && "active"}`}>
                    <a onClick={() => navegar("tienda")}>Tienda</a>
                  </li>

                  <li className={` ${active === "noticias" && "active"}`}>
                    <a onClick={() => navegar("noticias")}>Noticias</a>
                  </li>
                  <li>
                    <a onClick={() => navegar("contacto")}>Contacto</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <a href="#" className="search-switch">
                  <img src="/img/icon/search.png" alt="" />
                </a>

                <a onClick={() => navegar("carrito")}>
                  <img src="/img/icon/cart.png" alt="" />{" "}
                  <span>{totalUniqueItems}</span>
                </a>
                <div className="price">${cartTotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars" onClick={() => burgerMenu()} />
          </div>
        </div>
      </header>
    </>
  );
};

export default PublicHeader;
