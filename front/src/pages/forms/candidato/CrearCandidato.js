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
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CrearCandidato = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      paterno: "",
      materno: "",
      puesto: "",
    },

    onSubmit: (values, { resetForm, setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      style={{ margin: "auto" }}
    >
      <Typography variant="h3" component="h3" marginTop={2} marginBottom={4}>
        Agregar nuevo candidato
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <TextField
            label="Nombre(s)"
            variant="standard"
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Apellido paterno"
            variant="standard"
            name="paterno"
            onChange={formik.handleChange}
            value={formik.values.paterno}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Apellido materno"
            variant="standard"
            name="materno"
            onChange={formik.handleChange}
            value={formik.values.materno}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="puestoLabel">Puesto</InputLabel>
            <Select
              variant="standard"
              labelId="puestoLabel"
              name="puesto"
              value={formik.values.puesto}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Presidente"}>Presidente</MenuItem>
              <MenuItem value={"Senador"}>Senador</MenuItem>
              <MenuItem value={"Diputado"}>Diputado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" type="submit" fullWidth>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrearCandidato;
