import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilPlus,
  cilUserPlus,
  cilSmilePlus,
  cilFace,
  cilUser,
  cilFile,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Inicio",
    to: "/",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "PROPUESTA",
  },
  {
    component: CNavItem,
    name: "Registros",
    to: "/propuesta/registros",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Crear",
    to: "/propuesta/crear",
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "CANDIDATO",
  },
  {
    component: CNavItem,
    name: "Candidatos",
    to: "/candidato/registros",
    icon: <CIcon icon={cilFace} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Agregar",
    to: "/candidato/crear",
    icon: <CIcon icon={cilSmilePlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "USUARIO",
  },
  {
    component: CNavItem,
    name: "Usuarios",
    to: "/usuario/registros",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Registrar",
    to: "/usuario/crear",
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
];

export default _nav;
