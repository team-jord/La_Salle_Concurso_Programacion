/* React */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* Components & dependencies */
import { Button, TablePagination } from "@mui/material";
import Preloader from "../../utils/Preloader";

/* Service */
import ProductoService from "../../../services/Producto.service";

const TablaProductos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paquetes, setPaquetes] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadPaquetes = async () => {
      setLoading(true);
      try {
        const results = await ProductoService.list(limit, page * limit);
        setPaquetes(results.data);
        setTotal(results.total);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    loadPaquetes();
  }, [page, limit]);

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
                    Productos
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
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Precio</th>
                      {/* <th scope="col">Imagen</th> */}
                      <th scope="col">Editar</th>
                      <th scope="col">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paquetes.map((record, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{record.id}</th>
                          <td>{record.nombre}</td>
                          <td>{record.descripcion}</td>
                          <td>${record.precio}</td>
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

export default TablaProductos;
