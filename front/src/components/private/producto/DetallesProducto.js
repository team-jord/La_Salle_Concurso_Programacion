/* React */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

/* Components */
import Carruselmagenes from "./Carruselmagenes";

/* Service */
import ProductoService from "../../../services/Producto.service";
import S3Service from "../../../services/S3.services";
import Loading from "../../utils/Loading"
import TallasComponent from "./TallasComponent";
import { toast } from "react-toastify";
import ProductoRelacionadoItem from "./ProductoRelacionadoItem";
import FullPageLoading from "../../utils/FullPageLoading";

const DetallesProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    loadProducto();
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await ProductoService.getById(parseInt(id));

      setProducto(result);

      for (const url of result.imagenes) {
        const imagen = await S3Service.get(url);
        setImagenes((imagenes) => [...imagenes, imagen]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  const loadProducto = async () => {
    try {
      const data = await ProductoService.list(4, 0);
      setProductos(data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <FullPageLoading />
      ) : (
        <>
          <section className="shop-details">
            <div className="product__details__pic">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product__details__breadcrumb">
                      <a >Inicio</a>
                      <a >Tienda</a>
                      <span>Detalles del producto</span>
                    </div>
                  </div>
                </div>
                <Carruselmagenes imagenes={imagenes} />
              </div>
            </div>
            <div className="product__details__content">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="product__details__text">
                      <h4>{producto.nombre}</h4>
                      <div className="rating">
                        <i className="fa fa-star" />{" "}
                        <i className="fa fa-star" />{" "}
                        <i className="fa fa-star" />{" "}
                        <i className="fa fa-star" />{" "}
                        <i className="fa fa-star" />{" "}
                      </div>
                      <h3>
                        {producto.descuento > 0
                          ? producto.precioFinal.toFixed(2)
                          : producto.precio.toFixed(2)}

                        {producto.descuento > 0 ? (
                          <span>{producto.precio}</span>
                        ) : (
                          ""
                        )}
                      </h3>
                      <p>{producto.descripcion}</p>
                      <TallasComponent
                        tallas={producto.tallas_stock}
                        id={id}
                        nombre={producto.nombre}
                        precio={producto.precioFinal}
                      />
                      <div className="product__details__btns__option"></div>
                      <div className="product__details__last__option">
                        <h5>
                          <span>Guaranteed Safe Checkout</span>
                        </h5>
                        <img
                          src="/img/shop-details/details-payment.png"
                          alt=""
                        />
                        <ul>
                          <li>
                            <span>SKU:</span> {producto.id}
                          </li>
                          <li>
                            <span>Categories:</span> {producto.categoria}
                          </li>
                          <li>
                            <span>Tag:</span> {producto.etiquetas}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="related spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h3 className="related-title">Productos relacionados</h3>
                </div>
              </div>
              <div className="row">
                {productos.map((record, index) => {
                  return (
                    <ProductoRelacionadoItem
                      id={record.id}
                      nombre={record.nombre}
                      precio={record.precio}
                      descuento={record.descuento ? record.descuento : null}
                      imagenes={record.imagenes}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default DetallesProducto;
