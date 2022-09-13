import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";

const Carrusel = () => {
  const [active, setActive] = useState("itemNumber1");

  let bandera = 0;
  useEffect(() => {
    try {
      const data = bandera;

      let itemActual = document.querySelector(`#${active}`);
      console.log(itemActual);
      itemActual.style.display = "block";
      itemActual.style.opacity = 0;
      if (bandera === data) {
        setTimeout(() => {
          itemActual.style.opacity = 1;
          console.log("A");
        }, 50);
      }
      bandera += 1;
      itemActual.style.transition =
        "opacity 400ms ease 0s, transform 400ms ease 0s";
      console.log(itemActual.style);
      if (active === "itemNumber1") {
        let itemPasado = document.querySelector("#itemNumber2");
        itemPasado.style.display = "none";
        itemPasado.style.transition = "";
      } else {
        let itemPasado = document.querySelector("#itemNumber1");
        itemPasado.style.display = "none";
        itemPasado.style.transition = "";
      }
    } catch (error) {}
  }, [active]);

  useEffect(() => {
    setInterval(() => {
      if (active === "itemNumber1") {
        setActive("itemNumber2");
      } else {
        setActive("itemNumber1");
      }
    }, 10000);
  });

  const handleChange = (numero) => {
    if (active === "itemNumber1") {
      setActive("itemNumber2");
    } else {
      setActive("itemNumber1");
    }
  };
  return (
    <section className="hero">
      <div
        className="hero__slider owl-carousel "
        style={{ display: "contents" }}
      >
        <div id="itemNumber1">
          <FadeIn>
            <div
              className="hero__items set-bg "
              style={{
                backgroundImage: "url(https://tripwire-magazine.com/wp-content/uploads/2022/07/Gift-Ideas-For-Those-Who-Like-To-Be-Outdoors.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      <br />
                      <h6 style={{ display: "contents" }}>Colección caballero</h6>
                      <br />
                      <h2 style={{ display: "contents" }}>
                      Lo mas nuevo de este 2022
                      </h2>
                      <br />
                      <p style={{ display: "contents" }}>
                      Debido a su estilo sencillo y directo se lo ha considerado
                    un libro para niños; no obstante, su profundo carácter
                    reflexivo sobre la vida.
                      </p>
                      <br />
                      <a
                        href="#"
                        className="primary-btn"
                        style={{ display: "contents" }}
                      >
                        Comprar ahora <span className="arrow_right" />
                      </a>
                      <div className="hero__social">
                        <a href="#">
                          <i className="fa fa-facebook" />
                        </a>
                        <a href="#">
                          <i className="fa fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fa fa-pinterest" />
                        </a>
                        <a href="#">
                          <i className="fa fa-instagram" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div id="itemNumber2">
          <FadeIn>
            <div
              className="hero__items set-bg"
              
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1510681287331-342e7ec90c6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzNjM0MDQyfHxlbnwwfHx8fA%3D%3D&w=1000&q=80)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      <h6 style={{ display: "contents" }}>Colección outdoors</h6>
                      <br />
                      <h2 style={{ display: "contents" }}>
                      La mejor ropa que puedes encontrar
                      </h2>
                      <br />
                      <p style={{ display: "contents" }}>
                      El principito narra la historia de un piloto que, mientras
                    intenta reparar su avión averiado en medio del desierto del
                    Sahara.
                      </p>
                      <br />
                      <a
                        href="#"
                        className="primary-btn"
                        style={{ display: "contents" }}
                      >
                        Comprar ahora <span className="arrow_right" />
                      </a>
                      <div className="hero__social">
                        <a href="#">
                          <i className="fa fa-facebook" />
                        </a>
                        <a href="#">
                          <i className="fa fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fa fa-pinterest" />
                        </a>
                        <a href="#">
                          <i className="fa fa-instagram" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="owl-nav">
          <button
            type="button"
            role="presentation"
            className="owl-prev"
            onClick={() => handleChange(1)}
          >
            <span className="arrow_left">
              <span />
            </span>
          </button>
          <button
            type="button"
            role="presentation"
            className="owl-next"
            onClick={() => console.log("Siguiente")}
          >
            <span className="arrow_right">
              <span />
            </span>
          </button>
        </div>
        <div className="owl-dots disabled" />
      </div>
    </section>
  );
};

export default Carrusel;
