/** Soy dislexico y lo cree dos veces :,v */
import React from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Table,
} from "@mui/material";
import Box from "@mui/material/Box";

const TablaUsuariosGood = () => {
  return (
    <>
      <Box component="form" style={{ margin: "auto" }}>
        <Typography variant="h3" component="h3" marginTop={2} marginBottom={4}>
          Tabla de usuarios
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <center>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <h5>Nombre</h5>
                    </td>
                    <td>
                      <h5>Apellido paterno</h5>
                    </td>
                    <td>
                      <h5>Apellido paterno</h5>
                    </td>
                    <td>
                      <h5>Correo</h5>
                    </td>

                    <td>
                      <h5>CURP</h5>
                    </td>
                    <td>
                      <h5>Edad</h5>
                    </td>
                    <td>
                      <h5>Foto</h5>
                    </td>
                    <br />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rafael Antonio </td>
                    <td>Lopez </td>
                    <td>Garcia </td>
                    <td>rafa@gmail.com</td>
                    <td>OOAZ900824MTSRLL08</td>
                    <td>20</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Rafael Antonio </td>
                    <td>Lopez </td>
                    <td>Garcia </td>
                    <td>rafa@gmail.com</td>
                    <td>OOAZ900824MTSRLL08</td>
                    <td>20</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Rafael Antonio </td>
                    <td>Lopez </td>
                    <td>Garcia </td>
                    <td>rafa@gmail.com</td>
                    <td>OOAZ900824MTSRLL08</td>
                    <td>20</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Rafael Antonio </td>
                    <td>Lopez </td>
                    <td>Garcia </td>
                    <td>rafa@gmail.com</td>
                    <td>OOAZ900824MTSRLL08</td>
                    <td>20</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Rafael Antonio </td>
                    <td>Lopez </td>
                    <td>Garcia </td>
                    <td>rafa@gmail.com</td>
                    <td>OOAZ900824MTSRLL08</td>
                    <td>20</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                </tbody>
              </Table>
            </center>
          </Grid>
          {/* <Grid item xs={3}>
            <Button variant="contained" type="submit" fullWidth>
              Agregar
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default TablaUsuariosGood;
