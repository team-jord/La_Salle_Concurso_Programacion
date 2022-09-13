import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductoService from "../../../services/Producto.service";
import S3Service from "../../../services/S3.services";

import FullPageLoading from "../../utils/FullPageLoading";
import ItemProductoGrid from "./ItemProductoGrid";

const TiendaCompleta = () => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    getProductos();
    window.scrollTo(0, 0)
  }, []);

  const getProductos = async () => {
    setLoading(true);
    try {
      const data = await ProductoService.getAll();
      setProductos(data);
    } catch (error) {
      console.log(error);
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
          {/* Breadcrumb Section Begin */}
          <section className="breadcrumb-option">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb__text">
                    <h4>Tienda</h4>
                    <div className="breadcrumb__links">
                      <a href="#">Inicio</a>
                      <span>Tienda</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Breadcrumb Section End */}
          {/* Shop Section Begin */}
          <section className="shop spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="shop__sidebar">
                    <div className="shop__sidebar__search">
                      <form action="#">
                        <input type="text" placeholder="Search..." />
                        <button type="submit">
                          <span className="icon_search" />
                        </button>
                      </form>
                    </div>
                    <div className="shop__sidebar__accordion">
                      <div className="accordion" id="accordionExample">
                        <div className="card">
                          <div className="card-heading">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseOne"
                            >
                              Categorias
                            </a>
                          </div>
                          <div
                            id="collapseOne"
                            className="collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="shop__sidebar__categories">
                                <ul className="nice-scroll">
                                  <li>
                                    <a href="#">Hombre </a>
                                  </li>
                                  <li> 
                                    <a href="#">Mujes </a>
                                  </li>
                                  <li>
                                    <a href="#">Unisex </a>
                                  </li>
                                  <li>
                                    <a href="#">Outdoors </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-heading">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                            >
                              Marcas
                            </a>
                          </div>
                          <div
                            id="collapseTwo"
                            className="collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="shop__sidebar__brand">
                                <ul>
                                  <li>
                                    <a href="#">Louis Vuitton</a>
                                  </li>
                                  <li>
                                    <a href="#">Chanel</a>
                                  </li>
                                  <li>
                                    <a href="#">Hermes</a>
                                  </li>
                                  <li>
                                    <a href="#">Gucci</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-heading">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseThree"
                            >
                              Filtrar por precio
                            </a>
                          </div>
                          <div
                            id="collapseThree"
                            className="collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="shop__sidebar__price">
                                <ul>
                                  <li>
                                    <a href="#">$0.00 - $50.00</a>
                                  </li>
                                  <li>
                                    <a href="#">$50.00 - $100.00</a>
                                  </li>
                                  <li>
                                    <a href="#">$100.00 - $150.00</a>
                                  </li>
                                  <li>
                                    <a href="#">$150.00 - $200.00</a>
                                  </li>
                                  <li>
                                    <a href="#">$200.00 - $250.00</a>
                                  </li>
                                  <li>
                                    <a href="#">250.00+</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-heading">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseFour"
                            >
                              Tallas
                            </a>
                          </div>
                          <div
                            id="collapseFour"
                            className="collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="shop__sidebar__size">
                                <label htmlFor="xs">
                                  xs
                                  <input type="radio" id="xs" />
                                </label>
                                <label htmlFor="sm">
                                  s
                                  <input type="radio" id="sm" />
                                </label>
                                <label htmlFor="md">
                                  m
                                  <input type="radio" id="md" />
                                </label>
                                <label htmlFor="xl">
                                  xl
                                  <input type="radio" id="xl" />
                                </label>
                                <label htmlFor="2xl">
                                  2xl
                                  <input type="radio" id="2xl" />
                                </label>
                                <label htmlFor="xxl">
                                  xxl
                                  <input type="radio" id="xxl" />
                                </label>
                                <label htmlFor="3xl">
                                  3xl
                                  <input type="radio" id="3xl" />
                                </label>
                                <label htmlFor="4xl">
                                  4xl
                                  <input type="radio" id="4xl" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="card">
                              <div class="card-heading">
                                  <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                              </div>
                              <div id="collapseFive" class="collapse show" data-parent="#accordionExample">
                                  <div class="card-body">
                                      <div class="shop__sidebar__color">
                                          <label class="c-1" for="sp-1">
                                              <input type="radio" id="sp-1">
                                          </label>
                                          <label class="c-2" for="sp-2">
                                              <input type="radio" id="sp-2">
                                          </label>
                                          <label class="c-3" for="sp-3">
                                              <input type="radio" id="sp-3">
                                          </label>
                                          <label class="c-4" for="sp-4">
                                              <input type="radio" id="sp-4">
                                          </label>
                                          <label class="c-5" for="sp-5">
                                              <input type="radio" id="sp-5">
                                          </label>
                                          <label class="c-6" for="sp-6">
                                              <input type="radio" id="sp-6">
                                          </label>
                                          <label class="c-7" for="sp-7">
                                              <input type="radio" id="sp-7">
                                          </label>
                                          <label class="c-8" for="sp-8">
                                              <input type="radio" id="sp-8">
                                          </label>
                                          <label class="c-9" for="sp-9">
                                              <input type="radio" id="sp-9">
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
                        <div className="card">
                          <div className="card-heading">
                            <a
                              data-toggle="collapse"
                              data-target="#collapseSix"
                            >
                              Etiquetas
                            </a>
                          </div>
                          <div
                            id="collapseSix"
                            className="collapse show"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="shop__sidebar__tags">
                                <a href="#">Moda</a>
                                <a href="#">Caballero</a>
                                <a href="#">Dama</a>
                                <a href="#">Unisex</a>
                                <a href="#">Oferta</a>
                                <a href="#">Chamarras</a>
                                <a href="#">Pantalones</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="shop__product__option">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="shop__product__option__left">
                          <p>Mostrando 1–12 de 126 productos</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="shop__product__option__right">
                          <p>Ordenar por precio:</p>
                          <select>
                            <option value="">Mas bajo al mas alto</option>
                            <option value="">Mas alto al mas bajo</option>
                            <option value="">Aleatorio</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {productos.map((record, index) => {
                      // console.log(record);
                      if (record.descuento) {
                        return (
                          <ItemProductoGrid
                            id={record.id}
                            nombre={record.nombre}
                            precio={record.precio}
                            descuento={record.descuento}
                            imagenes={record.imagenes}
                          />
                        );
                      } else {
                        return (
                          <ItemProductoGrid
                            id={index}
                            nombre={record.nombre}
                            precio={record.precio}
                            imagenes={record.imagenes}
                          />
                        );
                      }
                    })}
                    
                  </div>

                 
                </div>
                {/* <div className="col-lg-12">
                <div className="row"> */}
                    <div className="col-lg-12">
                      <div className="product__pagination">
                        <a className="active" href="#">
                          1
                        </a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <span>...</span>
                        <a href="#">21</a>
                      </div>
                    </div>
                  {/* </div>
                </div> */}
              </div>
            </div>
          </section>
          {/* Shop Section End */}
        </>
      )}
    </>
  );
};

export default TiendaCompleta;
