/* React */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

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

/* Servicios */
import NoticiaService from "../../../services/Noticia.service";
import S3Service from "../../../services/S3.services";

const CrearNoticia = () => {
  const { currentUser } = useContext(AuthContext);
  const [noticia, setNoticia] = useState({});
  const [loading, setLoading] = useState(false);
  const [etiquetas, setEtiquetas] = useState("");
  const [file, setFile] = useState(undefined);

  const myTheme = createTheme({});
  const navigate = useNavigate();

  const saveProducto = async () => {
    setLoading(true);
    try {
      const noticiaSubir = { ...noticia, idUsuario: currentUser.id };

      if (file) {
        const uploadPhoto = await S3Service.upload(file);
        noticiaSubir.imagen = uploadPhoto.result.data;
        await NoticiaService.create(noticiaSubir);
      } else {
        await NoticiaService.create(noticiaSubir);
      }

      toast.success("Noticia creada con exito!");
    } catch (error) {
      toast.error(error);
    } finally {
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
                      <div className="col-lg-12">
                        <ThemeProvider theme={myTheme}>
                          <MUIRichTextEditor
                            label="Descripcion del paquete"
                            controls={[
                              "italic",
                              "underline",
                              "strikethrough",
                              "highlight",
                              "undo",
                              "redo",
                              "link",
                              "numberList",
                              "bulletList",
                              "quote",
                              "code",
                              "clear",
                              // "save"
                            ]}
                            // onSave={save}
                            inlineToolbar={true}
                            onChange={(value) =>
                              setNoticia({
                                ...noticia,
                                cuerpoNoticia: stateToHTML(
                                  value.getCurrentContent()
                                ),
                              })
                            }
                          />
                        </ThemeProvider>
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "45px" }}>
                      <div className="col-lg-12">
                        <p>Imagen</p>
                        <DropZone
                          saveFile={async (file) => {
                            setFile(file);
                            var reader = new FileReader();
                            var url = reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                    </div>

                    {file ? (
                      <div className="row">
                        <div className="col-lg-12">
                          <div style={{ textAlign: "center" }}>
                            <img
                              src={URL.createObjectURL(file)}
                              style={{
                                height: 300,
                                objectFit: "contain",
                                width: "-webkit-fill-available",
                              }}
                            />
                            <Typography
                              variant="body1"
                              component="span"
                              style={{
                                width: "-webkit-fill-available",
                              }}
                            >
                              {file.name}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Frase celebre
                        </label>
                        <input
                          onChange={(e) =>
                            setNoticia({
                              ...noticia,
                              fraseCelebre: e.target.value,
                            })
                          }
                          value={noticia.fraseCelebre}
                          className={`form-control`}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <label
                          className="form-control-label"
                          htmlFor="inputDanger1"
                        >
                          Autor de la frase celebre
                        </label>
                        <input
                          onChange={(e) =>
                            setNoticia({
                              ...noticia,
                              autorFraseCelebre: e.target.value,
                            })
                          }
                          value={noticia.autorFraseCelebre}
                          className={`form-control`}
                        />
                      </div>
                    </div>

                    <ChipListManual
                      label="Hashtags"
                      onChange={(list) => {
                        setNoticia({ ...noticia, tag: list });
                      }}
                      text={etiquetas}
                      setText={setEtiquetas}
                    />

                    {/* Botones */}
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => navigate("/producto")}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="col-lg-6">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => saveProducto()}
                        >
                          Guardar
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

export default CrearNoticia;
