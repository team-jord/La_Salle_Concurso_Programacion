import React from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CrearQuiz from "./CrearQuiz";

const CrearPropuesta = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      fondo: 0,
      minimo: 0,
      localidad: "",
      votoUnico: false,
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
        Crear nueva propuesta
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  name="votoUnico"
                  onChange={formik.handleChange}
                />
              }
              label={
                formik.values.votoUnico ? "Voto único" : "Permitir varios votos"
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nombre de la propuesta"
            variant="standard"
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción de la propuesta"
            variant="standard"
            name="descripcion"
            onChange={formik.handleChange}
            value={formik.values.descripcion}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fondo disponible"
            variant="standard"
            type="number"
            name="fondo"
            onChange={formik.handleChange}
            value={formik.values.fondo}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Mínimo de votos"
            variant="standard"
            type="number"
            fullWidth
            name="minimo"
            onChange={formik.handleChange}
            value={formik.values.minimo}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="localidadLabel">Localidad</InputLabel>
            <Select
              variant="standard"
              labelId="localidadLabel"
              name="localidad"
              value={formik.values.localidad}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Oaxaca"}>Oaxacanda</MenuItem>
              <MenuItem value={"Ocoyork"}>Ocoyork</MenuItem>
              <MenuItem value={"Zimayork"}>Zimayork</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6" marginBottom={2}>
            Encuesta
          </Typography>
          <CrearQuiz />
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

export default CrearPropuesta;
