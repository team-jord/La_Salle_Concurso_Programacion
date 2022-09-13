/* React */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

const CrearProducto = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagenesProducto, setImagenesProducto] = useState([]);

  const [etiquetas, setEtiquetas] = useState("");
  const [datos, setDatos] = useState({});
  const [talla, setTalla] = useState({});
  const [tallasArray, setTallasArray] = useState([]);

  const [file, setFile] = useState([]);

  let arrayOriginal = [];

  const [contador, setContador] = useState(1);

  const saveTalla = (values) => {
    setContador(contador + 1);
    try {
      const newTalla = (
        <TallasStock
          id={contador}
          talla={values.talla}
          cantidad={values.cantidad}
          setTallaActual={(data) => setTalla(data)}
          eliminarActual={(data) => eliminarTalla(data)}
        />
      );

      setTallasArray((tallasArray) => [...tallasArray, newTalla]);

      arrayOriginal = [...tallasArray, newTalla];
      
      const arrayTemporalActualizado = [];

      arrayOriginal.map((record, index) => {
        const newTalla = (
          <TallasStock
            id={record.props.id}
            talla={record.props.talla}
            cantidad={record.props.cantidad}
            setTallaActual={(data) => setTalla(data)}
            eliminarActual={(data) => eliminarTalla(data)}
          />
        );

        arrayTemporalActualizado.push(newTalla);
      });

      setTallasArray(arrayTemporalActualizado);

      arrayOriginal = [...arrayOriginal];
      setTalla({ talla: "", cantidad: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTalla = (id) => {
    try {
      const arrayT = arrayOriginal;
      let nuevoArray = [];
      arrayT.map((record, index) => {
        if (record.props.id != id) {
          nuevoArray.push(record);
        }
      });

      setTallasArray(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  };

  const saveProducto = async (valores) => {
    setLoading(true);
    try {
      setDatos({ ...datos, valores });
      const informacion = { ...datos, ...valores };

      let imagenesArray = []; //Array para los id del s3
      let tallasJson = []; //Array para almecenar los dias en formatos JSON y guardarlos en la BD

      /* Subida de imagenes del carrusel */
      for (const file of imagenesProducto) {
        const resultFile = await S3Service.upload(file);
        imagenesArray.push(resultFile.result.data);
      }

      for (const talla of tallasArray) {
        const TallaJSON = {
          talla: talla.props.talla,
          cantidad: talla.props.cantidad,
        };
        tallasJson.push(TallaJSON);
      }

      const dataProducto = {
        nombre: informacion.nombre,
        descripcion: informacion.descripcion,
        imagenes: imagenesArray,
        tallas_stock: tallasJson,
        precio: parseInt(informacion.precio),
        descuento: parseInt(informacion.descuento),
        categoria: informacion.categoria,
        etiquetas: informacion.etiquetas,
      };

      await ProductoService.create(dataProducto);
      navigate("/producto");
      toast.success("Producto creado con exito");
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(true);
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
                  <h4 className="card-title">Nuevo producto</h4>
                </div>
                <div className="grid-structure">
                  {/* <h1>{datos ? datos.nombre : null}</h1> */}
                  <div
                    className="grid-container"
                    style={{ backgroundColor: "white" }}
                  >
                    <Formik
                      initialValues={{
                        nombre: datos.nombre,
                        descripcion: "",
                        precio: null,
                        descuento: 0,
                      }}
                      validate={validate}
                      onSubmit={(values) => {
                        setDatos({ ...datos, values });
                        saveProducto(values);
                      }}
                    >
                      <Form className="mt-3" id="form1">
                        <div className="row">
                          <div className="col-lg-5">
                            <label
                              className="form-control-label"
                              htmlFor="inputDanger1"
                            >
                              Nombre
                            </label>
                            <Field name="nombre" type="text">
                              {({ field, meta: { touched, error } }) => (
                                <input
                                  className={`form-control ${
                                    touched && error ? "is-invalid" : ""
                                  }`}
                                  {...field}
                                />
                              )}
                            </Field>
                            <ErrorMessage name="nombre">
                              {(msg) => (
                                <div className="invalid-feedback">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="col-lg-7">
                            <label
                              className="form-control-label"
                              htmlFor="inputDanger1"
                            >
                              Descripción
                            </label>
                            <Field
                              as="textarea"
                              name="descripcion"
                              defaultValue={""}
                            >
                              {({ field, meta: { touched, error } }) => (
                                <textarea
                                  rows={3}
                                  style={{ height: 38 }}
                                  className={`form-control ${
                                    touched && error ? "is-invalid" : ""
                                  }`}
                                  {...field}
                                />
                              )}
                            </Field>

                            <ErrorMessage name="descripcion">
                              {(msg) => (
                                <div className="invalid-feedback">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <DropComponent
                              subirImagen={(data) => setImagenesProducto(data)}
                              // imagenesDefault={["https://i.ytimg.com/vi/VpBfGUXRGcU/maxresdefault.jpg", "https://i.ytimg.com/vi/LOsijtVDD-s/maxresdefault.jpg","https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/ba614d30-63b7-47ce-867a-9962294e1b22.jpg"]}
                            />
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
                            <Field name="precio" type="text">
                              {({ field, meta: { touched, error } }) => (
                                <input
                                  className={`form-control ${
                                    touched && error ? "is-invalid" : ""
                                  }`}
                                  {...field}
                                />
                              )}
                            </Field>
                            <ErrorMessage name="precio">
                              {(msg) => (
                                <div className="invalid-feedback">{msg}</div>
                              )}
                            </ErrorMessage>
                          </div>
                          <div className="col-lg-4">
                            <label
                              className="form-control-label"
                              htmlFor="inputDanger1"
                            >
                              Descuento
                            </label>
                            <Field name="descuento" type="text">
                              {({ field, meta: { touched, error } }) => (
                                <input
                                  className={`form-control ${
                                    touched && error ? "is-invalid" : ""
                                  }`}
                                  {...field}
                                />
                              )}
                            </Field>
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
                              onChange={(e) => {
                                setDatos({
                                  ...datos,
                                  categoria: e.target.value,
                                });
                              }}
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
                      </Form>
                    </Formik>

                    <ChipListManual
                      label="Etiquetas"
                      onChange={(list) => {
                        setDatos({ ...datos, etiquetas: list });
                      }}
                      text={etiquetas}
                      setText={setEtiquetas}
                    />

                    <div className="row">
                      <div className="col-lg-4">
                        <label className="form-control-label">Talla</label>

                        <input
                          className="form-control"
                          value={talla.talla}
                          onChange={(e) => {
                            setTalla({ ...talla, talla: e.target.value });
                          }}
                        />
                      </div>
                      <div className="col-lg-4">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Stock
                        </label>
                        <input
                          className="form-control"
                          value={talla.cantidad}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            setTalla({ ...talla, cantidad: e.target.value });
                          }}
                        />
                      </div>
                      <div className="col-lg-2">
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{ marginTop: "28px" }}
                          onClick={() => setTalla({ talla: "", cantidad: "" })}
                        >
                          Limpiar
                        </Button>
                      </div>
                      <div className="col-lg-2">
                        <Button
                          variant="outlined"
                          color="success"
                          type="submit"
                          style={{ marginTop: "28px" }}
                          onClick={() => saveTalla(talla)}
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>

                    <div className="row">
                      <div
                        className="col-lg-12"
                        style={{
                          overflow: "auto",
                          display: "-webkit-box",
                          boxShadow: "none",
                        }}
                      >
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

                    {/* Botones */}
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => navigate("/producto")}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="success"
                          type="submit"
                          form="form1"
                        >
                          Guardar
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

export default CrearProducto;

const validate = (values) => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = "El nombre es requerido";
  } else if (values.nombre.length < 5) {
    errors.nombre = "El nombre es muy corto";
  }

  if (!values.descripcion) {
    errors.descripcion = "La descripción es requerida";
  } else if (values.descripcion.length < 5) {
    errors.descripcion = "La descripción es muy corta";
  }

  if (!values.precio) {
    errors.precio = "Tienes que colocar un precio";
  } else if (values.precio < 0) {
    errors.precio = "El precio tiene que ser mayor a 0";
  } else if (values.precio === null) {
    errors.precio = "Tienes que colocar un precio";
  }

  return errors;
};

const validateStock = (values) => {
  const errors = {};
  if (!values.talla) {
    errors.talla = "La talla es requerida";
  }

  if (!values.cantidad) {
    errors.cantidad = "La cantidad en stock es requerida";
  } else if (values.cantidad <= 0) {
    errors.cantidad = "La cantidad en stock tiene que ser mayor a 0";
  }

  return errors;
};
