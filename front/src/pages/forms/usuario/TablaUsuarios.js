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

const TablaUsuarios = () => {
  return (
    <>
      <Box component="form" style={{ margin: "auto" }}>
        <Typography variant="h3" component="h3" marginTop={2} marginBottom={4}>
          Tabla de los Candidatos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <center>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <h5>Candidatura</h5>
                    </td>
                    <td>
                      <h5>Nombre</h5>
                    </td>
                    <td>
                      <h5>Imagen</h5>
                    </td>
                    <br />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Presidente municipal</td>
                    <td>Rafael Antonio</td>
                    <td>
                      <img
                        src="https://static01.nyt.com/images/2020/03/22/multimedia/22Fonseca-ES/22Fonseca-ES-mediumSquareAt3X.jpg"
                        style={{ width: "70px" }}
                      />
                    </td>
                  </tr>
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

export default TablaUsuarios;
