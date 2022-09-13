import React from "react";
import { Outlet } from "react-router-dom";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import PrivateHeader from "./PrivateHeader";
import PrivateSide from "./PrivateSide";

const PrivateLayout = () => {
  require("./css/c3.min.css");
  require("./css/chartist.min.css");
  require("./css/jquery-jvectormap-2.0.2.css");
  require("./css/style.min.css");
  const { width } = useWindowDimensions();
  
  return (
    <>
      <div      
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype={`${width > 1170 ? "full" : "mini-sidebar"}`}
        class={`${width > 1170 ? "" : "mini-sidebar"}`}
        // data-sidebartype="mini-sidebar"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <PrivateHeader />

        <PrivateSide />

        <div className="page-wrapper" style={{ display: "block" }}>
          <Outlet />
          <footer className="footer text-center text-muted" style={{backgroundColor: "#f9fbfd", }}>
          <p>
                Copyright © 2022 | Desarrollado por{" "}
                <a href="http://www.karimnot.com/" target="_blank">
                  Karimnot
                </a>
              </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
