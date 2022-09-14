import CrearPropuesta from "./pages/forms/propuesta/CrearPropuesta";
import CrearCandidato from "./pages/forms/candidato/CrearCandidato";
import CrearUsuario from "./pages/forms/usuario/CrearUsuario";
import TablaRegisttro from "./pages/forms/registro/TablaRegisttro";
import TablaUsuarios from "./pages/forms/usuario/TablaUsuarios";
import TablaUsuariosGood from "./pages/forms/usuario/TablaUsuariosGood";
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/propuesta/crear",
    element: CrearPropuesta,
    exact: true,
  },
  {
    path: "/candidato/crear",
    element: CrearCandidato,
    exact: true,
  },
  {
    path: "/usuario/crear",
    element: CrearUsuario,
    exact: true,
  },
  {
    path: "/propuesta/registros",
    element: TablaRegisttro,
    exact: true,
  },
  {
    path: "/candidato/registros",
    element: TablaUsuarios,
    exact: true,
  },
  {
    path: "/usuario/registros",
    element: TablaUsuariosGood,
    exact: true,
  },
];

export default routes;
