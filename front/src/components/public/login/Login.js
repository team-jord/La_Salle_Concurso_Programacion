import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../../services/User.Service";
import FullPageLoading from "../../utils/FullPageLoading";

const Login = () => {
  require("./login.css");

  const { login } = useContext(AuthContext);
  const [datos, setDatos] = useState({ correo: "", contraseña: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    if (datos) {
      const data = {
        contraseña: datos.contraseña,
        correo: datos.correo,
      };
      try {
        setLoading(true);
        const promise = UserService.login(data).then((response) => {
          if (response === "Correo o contraseña incorrectas") {
            toast.error("Correo o contraseña incorrectas");
          } else {
            login(response.user, response.token);
            toast.success("Inicio de sesión exitoso");
            window.location.reload(false);
            navigate("/");
          }
        });
        toast.promise(promise, {
          pending: "Espere por favor..",
          error: "Revise sus datos de acceso",
        });
      } catch (e) {
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <FullPageLoading />
      ) : (
        <body>
          <div className="containerLogin">
            <div className="img">
              <img src="images/bg-01.jpg" alt="img" />
            </div>
            <div className="login-container">
              <div id="form">
                <img
                  className="avator"
                  src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                  alt="user img"
                />
                <h2>Iniciar sesión</h2>
                <div className="input-div" one="">
                  <div className="i">
                    <i className="fas fa-user" />
                  </div>
                  <div>
                    <input
                      placeholder="Correo"
                      className="input"
                      type="text"
                      onChange={(e) =>
                        setDatos({ ...datos, correo: e.target.value })
                      }
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          iniciarSesion();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="input-div" two="">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div>
                    <input
                      placeholder="Contraseña"
                      className="input"
                      type="password"
                      onChange={(e) =>
                        setDatos({ ...datos, contraseña: e.target.value })
                      }
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          iniciarSesion();
                        }
                      }}
                    />
                  </div>
                </div>
                <a href="/">Regresar al inicio</a>
                <button className="btn" onClick={() => iniciarSesion()}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </body>
      )}
    </>
  );
};

export default Login;
