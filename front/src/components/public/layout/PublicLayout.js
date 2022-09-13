import React from "react";
import { Outlet } from "react-router-dom";
import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";
import { CartProvider } from "react-use-cart";

const PublicLayout = () => {
  require("./css/bootstrap.min.css");
  require("./css/font-awesome.min.css");
  require("./css/elegant-icons.css");
  require("./css/magnific-popup.css");
  require("./css/nice-select.css");
  require("./css/owl.carousel.min.css");
  require("./css/slicknav.min.css");
  require("./css/style.css");

  return (
    <>
      <CartProvider>
        <body>
          <PublicHeader />
          <Outlet />
          <PublicFooter />
        </body>
      </CartProvider>
    </>
  );
};

export default PublicLayout;
