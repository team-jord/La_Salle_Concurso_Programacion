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

require("./routes/images.routes")(app);
require("./routes/documents.routes")(app);
require("./routes/pdf.routes")(app);
require("./routes/technicalFile.routes")(app);
require("./routes/serviceRequest.routes")(app);
require("./routes/coreFile.routes")(app);
require("./routes/priceRequest.routes")(app);
require("./routes/modification.routes")(app);
require("./routes/verificationContract.routes")(app);
require("./routes/verificationList.routes")(app);
require("./routes/verificationSiteList.routes")(app);
require("./routes/verificationListAnexB.routes")(app);
require("./routes/testComprobation.routes")(app);
require("./routes/dictum.routes")(app);
require("./routes/dictumCover.routes")(app);
require("./routes/evaluationAct.routes")(app);
require("./routes/s3.routes")(app);
require("./routes/user.routes")(app);

