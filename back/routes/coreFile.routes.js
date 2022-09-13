module.exports = app => {    
    var router = require("express").Router();
    const coreFileController = require("../controllers/coreFile.controller");

    router.post("/", coreFileController.create);    

    app.use('/core-file', router);
}