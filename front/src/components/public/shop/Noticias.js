import React from "react";
import { useNavigate } from "react-router-dom";

const Noticias = () => {
  const navigate = useNavigate();

  return (
    <section className="latest spad" style={{ marginTop: "-174px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>Ultimas noticias</span>
              <h2>Noticias para nuestra comunidad</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="blog__item">
              <div
                className="blog__item__pic set-bg"
                data-setbg="https://sanjosepacifico.com/wp-content/uploads/2022/01/17b465fe-3007-4545-a1f6-b13492137235-min-scaled.jpg"
              />
              <div className="blog__item__text">
                <span>
                  <img src="img/icon/calendar.png" alt="" /> 21 febero 2022
                </span>
                <h5>San Jose del Pacifico</h5>
                <a href="./blog-details.html">Leer mas </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="blog__item">
              <div
                className="blog__item__pic set-bg"
                data-setbg="https://sanjosepacifico.com/wp-content/uploads/2022/01/17b465fe-3007-4545-a1f6-b13492137235-min-scaled.jpg"
              />
              <div className="blog__item__text">
                <span>
                  <img src="img/icon/calendar.png" alt="" /> 21 febero 2022
                </span>
                <h5>San Jose del Pacifico</h5>
                <a href="./blog-details.html">Leer mas </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="blog__item">
              <div
                className="blog__item__pic set-bg"
                data-setbg="https://coyoteaventuras.com/wp-content/uploads/2021/07/Cascada-Apoala-Coyote-Aventuras-min-scaled.jpg"
              />
              <div className="blog__item__text">
                <span>
                  <img src="img/icon/calendar.png" alt="" /> 28 febrero 2022
                </span>
                <h5>Caminando en Santiago Apoala</h5>
                <a href="./blog-details.html">Leer mas</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <center>
        <div className="blog__item">
          <div className="blog__item__text">
            <a onClick={() => navigate("/noticias")}>Ver mas</a>
          </div>
        </div>
      </center>
    </section>
  );
};

export default Noticias;
