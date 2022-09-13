import React from "react";

const Preloader = () => {
  require("./utils.css");
  return (
    
    <div
      class="preloader"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="lds-ripple">
        <div class="lds-pos"></div>
        <div class="lds-pos"></div>
      </div>
    </div>
  );
};

export default Preloader;
