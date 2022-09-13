import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const TallasStock = ({
  id,
  talla,
  cantidad,
  setTallaActual,
  eliminarActual,
  eliminar,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          Talla: {talla}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cantidad: {cantidad}
        </Typography>
      </CardContent>
      <CardActions>
        {eliminar ? null : (
          <Button
            size="small"
            onClick={() => {
              eliminarActual(id);
            }}
          >
            Eliminar
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TallasStock;
