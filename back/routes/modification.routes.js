module.exports = app => {    
    var router = require("express").Router();
    const modificationController = require("../controllers/modification.controller");

    router.post("/", modificationController.create);    

    //Encontrar las modificationes con el id del expediente   
    router.post("/:fileId", modificationController.findWithFileId);    


    app.use('/modification', router);
}