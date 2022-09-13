const express = require("express");//construir API rest
const bodyParser = require("body-parser"); // 
const cors = require("cors");
require("dotenv").config();

//crear una aplicación Express
const app = express();

// configuramos origin: http:// localhost: 9596
var corsOptions = {
    origin : "*"
}

app.use(cors(corsOptions));

//realizar parse de content-type - application/json de requests
app.use(bodyParser.json());

//realizar parse de content-type -- application/x-www-form-urlencoded de requests
app.use(bodyParser.urlencoded({extended: true}));

//habilitar el cors

app.use((req, res, next) => {

    req.header('Access-Control-Allow-Origin', '*');
    
    res.header('Access-Control-Allow-Origin', '*');
  
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  
    next();
  
  });
  
  app.use(express.json());
  
  app.use(express.urlencoded({ extended: false }));


const db = require("./models");

db.sequelize.sync({alter: true }).then(() => {
    console.log("Se sincronizó la db");
})

//asignar port para escuchar requets
const PORT = process.env.PORT || 9595;
app.listen(PORT, () => {
    console.log(`Server está ejecutándose en puerto ${PORT}.`);
});

require("./routes/proposal.routes")(app);
require("./routes/candidate.routes")(app);
require("./routes/user.routes")(app);

