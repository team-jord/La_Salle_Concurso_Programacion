import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Add } from "@material-ui/icons";
import { Box } from "@mui/system";
import React, { useState } from "react";

const CrearQuiz = () => {
  const [respuestas, addRespuesta] = useState();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Pregunta" variant="standard" fullWidth required />
        </Grid>
        <Grid item xs={11}>
          <TextField
            label="Respuesta"
            variant="standard"
            fullWidth
            required
            id="respuestaInput"
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              var input = document.getElementById("respuestaInput");
              var value = input.value;
              addRespuesta((respuestas) => [respuestas, value]);
              input.innerText = "";
            }}
            startIcon={<Add />}
          ></Button>
        </Grid>
        {respuestas &&
          respuestas.map((item) => {
            return <Grid item xs={12}></Grid>;
          })}

        <Grid item xs={6}>
          <Button variant="contained" color="warning" startIcon={<Add />}>
            Agregar pregunta
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrearQuiz;
