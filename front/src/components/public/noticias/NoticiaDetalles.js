import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NoticiaService from "../../../services/Noticia.service";
import FullPageLoading from "../../utils/FullPageLoading";

const NoticiaDetalles = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNoticia();
  }, []);

  const getNoticia = async () => {
    try {
      console.log(id);
      const data = await NoticiaService.getById(id);
      setNoticia(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <FullPageLoading />
      ) : (
        <>
          {/* Blog Details Hero Begin */}
          <section className="blog-hero spad">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-9 text-center">
                  <div className="blog__hero__text">
                    <h2>{noticia.titulo}</h2>
                    <ul>
                      <li>Autor: Karim</li>
                      <li>Febrero 21, 2022</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Blog Details Hero End */}
          {/* Blog Details Section Begin */}
          <section className="blog-details spad">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-12">
                  <div className="blog__details__pic">
                    <img
                      src="https://imparcialoaxaca.mx/wp-content/uploads/2015/12/fotos-de-paisajes-13.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="blog__details__content">
                    <div className="blog__details__share">
                      <span>Compartir</span>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="twitter">
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="youtube">
                            <i className="fa fa-youtube-play" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="linkedin">
                            <i className="fa fa-linkedin" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="blog__details__text">
                      <p>
                        Visitar Oaxaca de Juárez es descubrir una de las
                        ciudades más bonitas de México, cuyo centro histórico ha
                        sido declarado Patrimonio de la Humanidad por la UNESCO.
                        Capital del estado de Oaxaca, su región es conocida por
                        su riqueza gastronómica, artística, histórica y
                        arqueológica. Para ayudarte a aprovechar al máximo tu
                        estancia en Oaxaca, aquí tienes mi guía definitiva de
                        Oaxaca con las mejores cosas que ver y hacer.
                        Encontrarás mis consejos y mejores tips, los 20 lugares
                        que visitar y las actividades que hacer en la ciudad y
                        sus alrededores.
                      </p>
                      <p>
                        Oaxaca es una ciudad con muchas calles encantadoras para
                        recorrer. Además de sus fachadas de colores y el hermoso
                        papel picado que puedes ver flotando en muchos lugares,
                        es también un importante destino del arte callejero en
                        México. Explora la ciudad y encontrarás pequeñas plazas
                        y calles estrechas. No olvides visitar los pintorescos
                        barrios de Xochimilco y Jalatlalco: ¡es como caminar por
                        un pueblito!.
                      </p>
                    </div>
                    <div className="blog__details__quote">
                      <i className="fa fa-quote-left" />
                      <p>
                        "Necesitamos un cambio profundo en las instituciones, es
                        un cambio que tiene que llegar en paz, sin violencia.
                        ¿Cómo se consigue? Eso no lo sé".
                      </p>
                      <h6>Francisco Toledo</h6>
                    </div>
                    <div className="blog__details__text">
                      <p>
                        La oportunidad perfecta de conocer todo lo qué ver en
                        Oaxaca, quedarse más tiempo en este imperdible rincón en
                        México y vivir en Oaxaca como local, es haciendo una
                        experiencia de voluntariado.
                      </p>
                      <p>
                        En tu estadía en la ciudad sería oportuno la visita de
                        museos como: Rufino Tamayo, la casa de Juárez,
                        Nochezticalli donde conocerás los tintes naturales que
                        se usan para teñir.
                      </p>
                    </div>
                    <div className="blog__details__option">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="blog__details__author">
                            <div className="blog__details__author__pic">
                              <img
                                src="https://karimnot.com/assets/team-5-f5508fbdd0e983c869c963510ae5d2929b3006de143cfeb3f3336d9266d88223.jpg"
                                alt=""
                              />
                            </div>
                            <div className="blog__details__author__text">
                              <h5>Karimnot</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="blog__details__tags">
                            <a href="#">#Oaxaca</a>
                            <a href="#">#Consume_Local</a>
                            <a href="#">#2022</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Blog Details Section End */}
        </>
      )}
    </>
  );
};

export default NoticiaDetalles;
