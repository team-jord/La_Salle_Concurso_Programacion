import React from "react";
import CIcon from "@coreui/icons-react";
import { cilHome, cilPlus } from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

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
    name: "Crear propuesta",
    to: "/propuesta/crear/jairo/teamo",
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
];

export default _nav;
