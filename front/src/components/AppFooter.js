import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a
          href="https://www.youtube.com/watch?v=8SbUC-UaAxE"
          target="_blank"
          rel="noopener noreferrer"
        >
          Votaciones
        </a>
        <span className="ms-1">&copy; 2022 Software4All.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Concurso de programacion</span>
        <a
          href="https://www.ulsaoaxaca.edu.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          La Salle Oaxaca 2022
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
