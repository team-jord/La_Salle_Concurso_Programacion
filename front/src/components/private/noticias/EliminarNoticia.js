/* React */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Componentes y dependencias */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { stateToHTML } from "draft-js-export-html";
import MUIRichTextEditor from "mui-rte";
import { Typography } from "@mui/material";
import Preloader from "../../utils/Preloader";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { ChipListManual } from "../productos/ChipList";
import DropZone from "../../utils/DropZone";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";

/* Servicios */
import NoticiaService from "../../../services/Noticia.service";
import S3Service from "../../../services/S3.services";

const EliminarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagen, setImagen] = useState("");
  useEffect(() => {
    getNoticia();
  }, []);

  const getNoticia = async () => {
    setLoading(true);
    try {
      const data = await NoticiaService.getById(parseInt(id));
      setNoticia(data);
      if (data.imagen) {
        const imagenS3 = await S3Service.get(data.imagen);
        console.log(imagenS3);
        setImagen(imagenS3.result);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNoticia = async () => {
    setLoading(true);
    try {
      const noticiaBorrada = await NoticiaService.remove(id);
      toast.info("Noticia eliminada");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      navigate("/noticias");
    }
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
                  <h4 className="card-title">Nueva noticia</h4>
                </div>
                <div className="grid-structure">
                  <div
                    className="grid-container"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Titulo
                        </label>
                        <input
                          onChange={(e) =>
                            setNoticia({ ...noticia, titulo: e.target.value })
                          }
                          value={noticia.titulo}
                          className={`form-control`}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12" style={{ marginTop: "20px" }}>
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Cuerpo de la noticia
                        </label>
                        <h6
                          style={{ marginLeft: "20px" }}
                          dangerouslySetInnerHTML={{
                            __html: noticia.cuerpoNoticia,
                          }}
                        ></h6>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                      <div className="col-lg-12">
                        <p>Imagen</p>
                      </div>
                    </div>

                    {noticia.imagen ? (
                      <div className="row">
                        <div className="col-lg-12">
                          <div style={{ textAlign: "center" }}>
                            <img
                              src={String(imagen)}
                              style={{
                                height: 300,
                                objectFit: "contain",
                                width: "-webkit-fill-available",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="row" style={{ marginTop: "20px" }}>
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Frase celebre
                        </label>
                        <input
                          value={noticia.fraseCelebre}
                          className={`form-control`}
                        />
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: "20px" }}>
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Autor de la frase celebre
                        </label>
                        <input
                          value={noticia.autorFraseCelebre}
                          className={`form-control`}
                        />
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: "20px" }}>
                      <div clasName="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Hashtags
                        </label>
                        <p>
                          {noticia.tag.split(", ").map((record, index) => {
                            return <> #{record}</>;
                          })}
                        </p>
                      </div>
                    </div>
                    {/* Botones */}
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="col-lg-6">
                        <Button
                          color="error"
                          onClick={() => navigate("/noticias")}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="error"
                          form="form1"
                          onClick={() => deleteNoticia()}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EliminarNoticia;
