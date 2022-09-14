import React, { useState } from "react";
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

const CrearUsuario = () => {
  const [file, setFile] = useState(undefined);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      paterno: "",
      materno: "",
      correo: "",
      password: "",
      rol: "",
      idINE: "",
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
        Registrar nuevo usuario
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
        <Grid item xs={6}>
          <TextField
            label="Correo"
            variant="standard"
            name="correo"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.correo}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Contraseña"
            variant="standard"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="rolLabel">Rol</InputLabel>
            <Select
              variant="standard"
              labelId="rolLabel"
              name="rol"
              value={formik.values.rol}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Administrador"}>Administrador</MenuItem>
              <MenuItem value={"Mortal"}>Mortal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="INE ID"
            variant="standard"
            name="idINE"
            onChange={formik.handleChange}
            value={formik.values.idINE}
            fullWidth
            required
          />
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

export default CrearUsuario;
