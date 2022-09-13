import React from "react";

const Colors = React.lazy(() => import("./pages/theme/colors/Colors"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/propuesta/crear/jairo/teamo",
    name: "Theme",
    element: Colors,
    exact: true,
  },
];

export default routes;
