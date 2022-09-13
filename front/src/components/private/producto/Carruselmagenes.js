import React, { useState } from "react";

const Carruselmagenes = ({ imagenes }) => {
  const [anterior, setActual] = useState("tabs-0");
  const setImageActive = (idImagen) => {
    if (idImagen != anterior) {
      try {
        let imagenActiva;
        imagenActiva = document.querySelector(`#${idImagen}`);

        if (imagenActiva) {
          imagenActiva.className = `${idImagen} active`;

          let imagenAnterior = document.querySelector(`#${anterior}`);

          imagenAnterior.className = "tab-pane";

          setActual(idImagen);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-3 col-md-3">
        <ul
          className="nav nav-tabs"
          role="tablist"
          style={{ overflowY: "auto", maxHeight: "400px", overFLowX: "clip" }}
        >
          {imagenes.map((record, index) => {
            return (
              <li
                className="nav-item"
                onClick={() => setImageActive(`tabs-${index}`)}
              >
                <a className="nav-link" data-toggle="tab" role="tab">
                  <div
                    className="product__thumb__pic set-bg"
                    style={{
                      backgroundImage: `url(${record.result})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-lg-6 col-md-9">
        {/* Carrusel de imagenes */}
        <div className="tab-content">
          {imagenes.map((record, index) => {
            if (index === 0) {
              return (
                <div
                  className="tab-pane active"
                  id={`tabs-${index}`}
                  role="tabpanel"
                >
                  <div className="product__details__pic__item">
                    <img src={record.result} alt="" style={{maxHeight: "400px"}} />
                  </div>
                </div>
              );
            }
            return (
              <div className="tab-pane" id={`tabs-${index}`} role="tabpanel">
                <div className="product__details__pic__item">
                  <img
                    src={record.result}
                    alt=""
                    style={{maxHeight: "400px"}}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carruselmagenes;
