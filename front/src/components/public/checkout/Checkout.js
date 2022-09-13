import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import PaypalService from "../../../services/Paypal.service";

const validate = (values) => {
  const errors = {};

  if (!values.nombre) {
    errors.nombre = "Debes de colocar tu nombre";
  } else if (values.nombre.length < 5) {
    errors.nombre = "El nombre es muy corto";
  }

  if (!values.apellido) {
    errors.apellido = "Debes de colocar tu(s) apellidos";
  }

  if (!values.direccion) {
    errors.direccion = "Debes de colocar tu direccion";
  }

  if (!values.ciudad) {
    errors.ciudad = "Debes de colocar tu ciudad";
  }

  if (!values.estado) {
    errors.estado = "Debes de colocar tu estado";
  }

  if (!values.cp) {
    errors.cp = "Debes de colocar tu C.P.";
  }

  if (!values.numeroTelefono) {
    errors.numeroTelefono = "Debes de colocar tu Número";
  }

  if (!values.email) {
    errors.email = "Debes de colocar tu email";
  }

  if (!values.pago) {
    errors.pago = "Escoge un metodo de pago";
  }

  return errors;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  let total = 0;
  let productosArray = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generarOrden = async (data) => {
    try {
      const usuario = {
        nombre: data.nombre,
        apellido: data.apellido,
        direccion: data.direccion,
        ciudad: data.ciudad,
        estado: data.estado,
        cp: data.cp,
        numeroTelefono: data.numeroTelefono,
        email: data.email,
      };

      const indicaciones = data.indicaciones;

      const precio = (total + 150).toFixed(2);

      const dataOrden = {
        usuario,
        productos: productosArray,
        precio,
        indicaciones,
      };

      PaypalService.generarOrden(dataOrden).then((response) => {
        window.location.href = response.links[1].href;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Check Out</h4>
                <div className="breadcrumb__links">
                  <a href="#/" onClick={() => navigate("/")}>
                    Inicio
                  </a>
                  <a href="#/" onClick={() => navigate("/tienda")}>
                    Tienda
                  </a>
                  <span>Check Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Checkout Section Begin */}
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <Formik
              initialValues={{
                nombre: "",
                apellido: "",
                direccion: "",
                ciudad: "",
                estado: "",
                cp: "",
                numeroTelefono: "",
                email: "",
                indicaciones: "",
                pago: "",
              }}
              validate={validate}
              onSubmit={(values) => {
                generarOrden(values);
              }}
            >
              <Form>
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <h6 className="checkout__title">Detalles de la compra</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Nombre(s)<span>*</span>
                          </p>
                          <Field name="nombre" type="text">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                style={{
                                  borderColor: `${
                                    touched && error ? "red" : "#e1e1e1"
                                  }`,
                                  color: `${
                                    touched && error ? "red" : "#b7b7b7"
                                  }`,
                                }}
                                placeholder="Nombre(s)"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="nombre">
                            {(msg) => (
                              <p
                                style={{
                                  color: `red`,
                                  fontSize: "12px",
                                  marginTop: "-22px",
                                }}
                              >
                                {msg}
                              </p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Apellidos<span>*</span>
                          </p>
                          <Field name="apellido" type="text">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                style={{
                                  borderColor: `${
                                    touched && error ? "red" : "#e1e1e1"
                                  }`,
                                  color: `${
                                    touched && error ? "red" : "#b7b7b7"
                                  }`,
                                }}
                                placeholder="Apellido(s)"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="apellido">
                            {(msg) => (
                              <p
                                style={{
                                  color: `red`,
                                  fontSize: "12px",
                                  marginTop: "-22px",
                                }}
                              >
                                {msg}
                              </p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Dirección<span>*</span>
                      </p>
                      <Field name="direccion" type="text">
                        {({ field, meta: { touched, error } }) => (
                          <input
                            style={{
                              borderColor: `${
                                touched && error ? "red" : "#e1e1e1"
                              }`,
                              color: `${touched && error ? "red" : "#b7b7b7"}`,
                            }}
                            placeholder="Dirección"
                            {...field}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="direccion">
                        {(msg) => (
                          <p
                            style={{
                              color: `red`,
                              fontSize: "12px",
                              marginTop: "-22px",
                            }}
                          >
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Ciudad<span>*</span>
                      </p>
                      <Field name="ciudad" type="text">
                        {({ field, meta: { touched, error } }) => (
                          <input
                            style={{
                              borderColor: `${
                                touched && error ? "red" : "#e1e1e1"
                              }`,
                              color: `${touched && error ? "red" : "#b7b7b7"}`,
                            }}
                            placeholder="Ciudad"
                            {...field}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="ciudad">
                        {(msg) => (
                          <p
                            style={{
                              color: `red`,
                              fontSize: "12px",
                              marginTop: "-22px",
                            }}
                          >
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Estado<span>*</span>
                      </p>
                      <Field name="estado" type="text">
                        {({ field, meta: { touched, error } }) => (
                          <input
                            style={{
                              borderColor: `${
                                touched && error ? "red" : "#e1e1e1"
                              }`,
                              color: `${touched && error ? "red" : "#b7b7b7"}`,
                            }}
                            placeholder="Estado"
                            {...field}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="estado">
                        {(msg) => (
                          <p
                            style={{
                              color: `red`,
                              fontSize: "12px",
                              marginTop: "-22px",
                            }}
                          >
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Códigos postal<span>*</span>
                      </p>
                      <Field name="cp" type="text">
                        {({ field, meta: { touched, error } }) => (
                          <input
                            style={{
                              borderColor: `${
                                touched && error ? "red" : "#e1e1e1"
                              }`,
                              color: `${touched && error ? "red" : "#b7b7b7"}`,
                            }}
                            placeholder="Códigos postal"
                            {...field}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="cp">
                        {(msg) => (
                          <p
                            style={{
                              color: `red`,
                              fontSize: "12px",
                              marginTop: "-22px",
                            }}
                          >
                            {msg}
                          </p>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Número de teléfono<span>*</span>
                          </p>
                          <Field name="numeroTelefono" type="text">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                style={{
                                  borderColor: `${
                                    touched && error ? "red" : "#e1e1e1"
                                  }`,
                                  color: `${
                                    touched && error ? "red" : "#b7b7b7"
                                  }`,
                                }}
                                placeholder="Número de teléfono"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="numeroTelefono">
                            {(msg) => (
                              <p
                                style={{
                                  color: `red`,
                                  fontSize: "12px",
                                  marginTop: "-22px",
                                }}
                              >
                                {msg}
                              </p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Email<span>*</span>
                          </p>
                          <Field name="email" type="text">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                style={{
                                  borderColor: `${
                                    touched && error ? "red" : "#e1e1e1"
                                  }`,
                                  color: `${
                                    touched && error ? "red" : "#b7b7b7"
                                  }`,
                                }}
                                placeholder="Email"
                                {...field}
                              />
                            )}
                          </Field>
                          <ErrorMessage name="email">
                            {(msg) => (
                              <p
                                style={{
                                  color: `red`,
                                  fontSize: "12px",
                                  marginTop: "-22px",
                                }}
                              >
                                {msg}
                              </p>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                    </div>

                    <div className="checkout__input">
                      <p>Instrucciones adicionales para la entrega</p>
                      <Field name="indicaciones" type="text">
                        {({ field, meta: { touched, error } }) => (
                          <input
                            style={{
                              borderColor: `${
                                touched && error ? "red" : "#e1e1e1"
                              }`,
                              color: `${touched && error ? "red" : "#b7b7b7"}`,
                            }}
                            placeholder="Indicaciones extra para la entrega"
                            {...field}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                      <h4 className="order__title">Resumen</h4>
                      <div className="checkout__order__products">
                        Producto <span>Total</span>
                      </div>
                      <ul className="checkout__total__products">
                        {items.map((record, index) => {
                          total += record.itemTotal;
                          let number = 0;
                          index <= 10
                            ? (number = `0${index + 1}`)
                            : (number = index + 1);
                          const informacion = JSON.parse(record.name);

                          const newProducto = {
                            id: informacion.id,
                            nombre: informacion.nombre,
                            talla: informacion.talla,
                            cantidad: informacion.cantidad,
                          };

                          productosArray.push(newProducto);
                          return (
                            <li>
                              {number}. {informacion.nombre} {informacion.talla}{" "}
                              <span>$ {record.itemTotal.toFixed(2)}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className="checkout__total__all">
                        <li>
                          Subtotal <span>${total.toFixed(2)}</span>
                        </li>
                        <li>
                          Costo de envio <span>$150</span>
                        </li>
                        <li>
                          Total <span>${(total + 150).toFixed(2)}</span>
                        </li>
                      </ul>
                      <p>Elige el metodo de pago de tu preferencia.</p>

                      <div role="group" aria-labelledby="my-radio-group">
                        <div className="checkout__input__checkbox">
                          <label>
                            <Field type="radio" name="pago" value="Paypal" />
                            Paypal
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="checkout__input__checkbox">
                          <label>
                            <Field type="radio" name="pago" value="Stripe" />
                            Stripe
                            <span className="checkmark" />
                          </label>
                        </div>
                        <ErrorMessage name="pago">
                          {(msg) => (
                            <p
                              style={{
                                color: `red`,
                                fontSize: "12px",
                                marginTop: "-22px",
                              }}
                            >
                              {msg}
                            </p>
                          )}
                        </ErrorMessage>
                      </div>
                      <button type="submit" className="site-btn">
                        IR A PAGAR
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
      {/* Checkout Section End */}
    </>
  );
};

export default Checkout;
