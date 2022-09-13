import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const PrivateSide = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  useEffect(() => {
    let url = window.location.href;
    if (url.includes("login")) {
      navigate("/");
    }

    if (url.includes("producto")) {
      setActive("producto");
    }

    if (url.includes("noticias")) {
      setActive("noticias");
    }

    if (url.includes("pagos")) {
      setActive("pagos");
    }
  }, []);

  const navegar = (direccion) => {
    if (direccion === "dashboard") {
      navigate("/");
      setActive("dashboard");
      return;
    }
    navigate(direccion);
    setActive(direccion);
  };

  const salir = () => {
    logout();
    window.location.reload(false);
    navigate("/tienda");
  };

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      {/* Sidebar scroll*/}
      <div
        className="scroll-sidebar ps-container ps-theme-default ps-active-y"
        data-sidebarbg="skin6"
        data-ps-id="d5ee0991-204d-1c76-8ad0-c7e614018723"
      >
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="in">
            <li
              className={`sidebar-item ${active === "dashboard" && "selected"}`}
              onClick={() => navegar(`dashboard`)}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "dashboard" && "active"
                }`}
                href={"#/"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home feather-icon"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="hide-menu">Dashboard</span>
              </a>
            </li>
            <li className="list-divider" />
            <li className="nav-small-cap">
              <span className="hide-menu">Tienda</span>
            </li>
            <li
              className={`sidebar-item ${active === "producto" && "selected"}`}
              onClick={() => navegar(`producto`)}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "producto" && "active"
                }`}
                href="#/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-tag feather-icon"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1={7} y1={7} x2={7} y2={7} />
                </svg>
                <span className="hide-menu">Productos</span>
              </a>
            </li>
            <li
              className={`sidebar-item ${active === "noticias" && "selected"}`}
              onClick={() => navegar(`noticias`)}
            >
              {" "}
              <a
                href="#/"
                className={`sidebar-link sidebar-link ${
                  active === "noticias" && "active"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-message-square feather-icon"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="hide-menu">Noticias</span>
              </a>
            </li>
            <li
              className={`sidebar-item ${active === "pagos" && "selected"}`}
              onClick={() => navegar(`pagos`)}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "pagos" && "active"
                }`}
                href="#/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-calendar feather-icon"
                >
                  <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                  <line x1={16} y1={2} x2={16} y2={6} />
                  <line x1={8} y1={2} x2={8} y2={6} />
                  <line x1={3} y1={10} x2={21} y2={10} />
                </svg>
                <span className="hide-menu">Pagos</span>
              </a>
            </li>
            <li className="list-divider" />
            <li className="nav-small-cap">
              <span className="hide-menu">Configuracion</span>
            </li>
            <li
              className={`sidebar-item ${active === "usuarios" && "selected"}`}
              onClick={() => navegar(`usuarios`)}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "usuarios" && "active"
                }`}
                href="#/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-text feather-icon"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1={16} y1={13} x2={8} y2={13} />
                  <line x1={16} y1={17} x2={8} y2={17} />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span className="hide-menu">Usuarios </span>
              </a>
            </li>
            <li
              className={`sidebar-item ${active === "micuenta" && "selected"}`}
              onClick={() => navegar(`micuenta`)}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "micuenta" && "active"
                }`}
                href="#/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-3 feather-icon"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="hide-menu">Mi cuenta </span>
              </a>
            </li>
            <li
              className={`sidebar-item ${active === "salir" && "selected"}`}
              onClick={() => salir()}
            >
              {" "}
              <a
                className={`sidebar-link sidebar-link ${
                  active === "salir" && "active"
                }`}
                href="#/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-log-out feather-icon"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="hide-menu">Salir </span>
              </a>
            </li>
          </ul>
        </nav>
        {/* End Sidebar navigation */}
        <div className="ps-scrollbar-x-rail" style={{ left: 0, bottom: 0 }}>
          <div
            className="ps-scrollbar-x"
            tabIndex={0}
            style={{ left: 0, width: 0 }}
          />
        </div>
      </div>
      {/* End Sidebar scroll*/}
    </aside>
  );
};

export default PrivateSide;
