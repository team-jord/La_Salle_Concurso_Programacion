
module.exports = app => {    
    var router = require("express").Router();
    const technicalFileController    = require("../controllers/technicalFile.controller");

    // Read HTML Template

    router.post("/", technicalFileController.create);

    router.get("/all", technicalFileController.findAll);

    router.get("/all-detail", technicalFileController.findAllDetail);

    router.get("/:id", technicalFileController.findOne);    

    
    router.put("/:id", technicalFileController.update);        

    router.put("/modification/:id", technicalFileController.addModification);        

    app.use('/technical-file', router);
}