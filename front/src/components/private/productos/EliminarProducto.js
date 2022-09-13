/* React */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Components & dependencies */
import { Button } from "@mui/material";
import Preloader from "../../utils/Preloader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DropComponent from "../imagesDrop";
import TallasStock from "./TallasStock";
import { ChipListManual } from "./ChipList";
import { toast } from "react-toastify";

/* Services */
import S3Service from "../../../services/S3.services";
import ProductoService from "../../../services/Producto.service";
import ImagenesBorrar from "./ImagenesBorrar";

const EliminarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true);

  const [imagenesProducto, setImagenesProducto] = useState([]);
  const [etiquetas, setEtiquetas] = useState("");
  const [datos, setDatos] = useState({});
  const [talla, setTalla] = useState({});
  const [tallasArray, setTallasArray] = useState([]);

  let arrayOriginal = [];

  const [contador, setContador] = useState(1);

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    try {
      const result = await ProductoService.getById(id);
      setProducto(result);

      if (result.imagenes) {
        for (const imagen of result.imagenes) {
          const result = await S3Service.get(imagen);
          setImagenesProducto((imagenesProducto) => [
            ...imagenesProducto,
            result.result,
          ]);
        }
      }

      if (result.tallas_stock) {
        let contadorTemp = 1;
        for (const record of result.tallas_stock) {
          const newTalla = (
            <TallasStock
              id={contadorTemp}
              talla={record.talla}
              cantidad={record.cantidad}
              setTallaActual={(data) => setTalla(data)}
              eliminarActual={(data) => eliminarTalla(data)}
              eliminar={true}
            />
          );

          arrayOriginal.push(newTalla);
          contadorTemp = contadorTemp + 1;
        }

        setTallasArray(arrayOriginal);
        const arrayTemporalActualizado = [];

        arrayOriginal.map((record, index) => {
          const newTalla = (
            <TallasStock
              id={record.props.id}
              talla={record.props.talla}
              cantidad={record.props.cantidad}
              setTallaActual={(data) => setTalla(data)}
              eliminarActual={(data) => eliminarTalla(data)}
              eliminar={true}
            />
          );

          arrayTemporalActualizado.push(newTalla);
        });

        setTallasArray(arrayTemporalActualizado);

        arrayOriginal = arrayTemporalActualizado;

        setContador(contadorTemp);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarTalla = (id) => {
    try {
      setTallasArray(arrayOriginal);
      const arrayT = arrayOriginal;
      let nuevoArray = [];
      arrayOriginal.map((record) => {
        if (record.props.id != id) {
          nuevoArray.push(record);
        }
      });
      arrayOriginal = nuevoArray;
      setTallasArray(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProducto = async () => {
    setLoading(true);
    try {
      const informacion = { ...datos, ...producto };

      let imagenesArray = []; //Array para los id del s3
      let tallasJson = []; //Array para almecenar los dias en formatos JSON y guardarlos en la BD

      /* Subida de imagenes del carrusel */
      for (const file of imagenesProducto) {
        if (!file.urlImaen) {
          const resultFile = await S3Service.upload(file);
          imagenesArray.push(resultFile.result.data);
        } else {
          const idImagen = file.urlImaen.split("/")[3].split("?")[0];
          imagenesArray.push(idImagen);
        }
      }

      for (const talla of tallasArray) {
        const TallaJSON = {
          talla: talla.props.talla,
          cantidad: talla.props.cantidad,
        };
        tallasJson.push(TallaJSON);
      }

      const dataProducto = {
        id,
        nombre: informacion.nombre,
        descripcion: informacion.descripcion,
        imagenes: imagenesArray,
        tallas_stock: tallasJson,
        precio: parseInt(informacion.precio),
        descuento: parseInt(informacion.descuento),
        categoria: informacion.categoria,
        etiquetas: informacion.etiquetas,
      };

      const actualizacionProducto = await ProductoService.update(dataProducto);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      navigate("/producto");
    }
  };

  const deleteProducto = async () => {
    setLoading(true);
    try {
      const data = await ProductoService.remove(parseInt(id));
      toast.info("Producto eliminado");
    } catch (error) {
      toast.error(error);
    }finally{
      setLoading(false);
      navigate("/producto")
    }
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div style={{ display: "flex" }}>
                  <h4 className="card-title">
                    Vas a eliminar el siguiente producto
                  </h4>
                </div>
                <div className="grid-structure">
                  {/* <h1>{datos ? datos.nombre : null}</h1> */}
                  <div
                    className="grid-container"
                    style={{ backgroundColor: "white" }}
                  >
                    {/* <form className="mt-3" id="form1"> */}
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Nombre
                        </label>

                        <input
                          placeholder="Nombre del producto"
                          required
                          readonly
                          value={producto.nombre}
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-7">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Descripción
                        </label>
                        <textarea
                          className="form-control"
                          value={producto.descripcion}
                          readonly
                          rows={3}
                          style={{ height: 55 }}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <ImagenesBorrar previewImages={imagenesProducto} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Precio
                        </label>
                        <input
                          placeholder="Precio del producto"
                          required
                          input
                          type="number"
                          step="0.01"
                          value={producto.precio}
                          readonly
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-4">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Descuento
                        </label>
                        <input
                          placeholder="Descuento del producto"
                          required
                          input
                          type="number"
                          step="0.01"
                          value={producto.descuento}
                          readonly
                          className="form-control"
                        />
                      </div>
                      <div className="col-lg-4">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Categoria
                        </label>
                        <select
                          className="form-control"
                          id="inlineFormCustomSelect"
                          name="categoria"
                          readonly
                          value={producto.categoria}
                        >
                          <option disabled="disabled" selected="selected">
                            Selecciona una
                          </option>
                          <option value="Caballero">Caballero</option>
                          <option value="Dama">Dama</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>
                    </div>
                    {/* </form> */}
                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Etiquetas
                        </label>
                        <input
                          placeholder="Etiquetas del producto"
                          required
                          input
                          value={producto.etiquetas}
                          readonly
                          className="form-control"
                        />
                      </div>
                    </div>{" "}
                    <div className="row">
                      <div
                        className="col-lg-12"
                        style={{
                          overflow: "auto",
                          display: "-webkit-box",
                          boxShadow: "none",
                        }}
                      >
                        <br />
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Tallas
                        </label>
                        <br />
                        {tallasArray.map((record, index) => {
                          return (
                            <>
                              <div
                                id="row__posterLarge"
                                style={{
                                  padding: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                {record}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="col-lg-6">
                        <Button
                          // variant="outlined"
                          color="error"
                          onClick={() => navigate("/producto")}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="error"
                          form="form1"
                          onClick={() => deleteProducto()}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EliminarProducto;
