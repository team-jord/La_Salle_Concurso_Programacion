/* React */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Componentes y dependencias */
import Preloader from "../../utils/Preloader";
import { Button, TablePagination } from "@mui/material";
import { toast } from "react-toastify";

/* Servicios */
import NoticiaService from "../../../services/Noticia.service";

const TablaNoticias = () => {
  const [noticias, setNoticias] = useState({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getNoticias();
  }, []);

  const getNoticias = async () => {
    setLoading(true);
    try {
      const data = await NoticiaService.getAll();
      setNoticias(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div style={{ display: "flex" }}>
                  <h4
                    className="card-title"
                    style={{ marginRight: "20px", marginTop: "6px" }}
                  >
                    Noticias
                  </h4>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => navigate(`nuevo`)}
                  >
                    Nuevo
                  </Button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Imagen</th>
                      {/* <th scope="col">Imagen</th> */}
                      <th scope="col">Editar</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticias.map((record, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{record.id}</th>
                          <td>{record.titulo}</td>
                          <td dangerouslySetInnerHTML={{__html: record.cuerpoNoticia}} ></td>
                          <td>
                            <img src={null} alt="Imagen de la noticia" />
                          </td>
                          {/* <td>
                          <img src={null} alt="Imagen producto" />
                        </td> */}
                          <td>
                            {" "}
                            <a onClick={() => navigate(`editar/${record.id}`)}>
                              <span className="material-icons-sharp">
                                {" "}
                                edit{" "}
                              </span>
                            </a>
                          </td>
                          <td>
                            {" "}
                            <span
                              className="material-icons-sharp"
                              onClick={() => navigate(`eliminar/${record.id}`)}
                            >
                              {" "}
                              delete{" "}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <TablePagination
                style={{ color: "var(--color-dark-variant)" }}
                component="div"
                classes="recent-orders"
                labelRowsPerPage="Items por pagina"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaNoticias;
