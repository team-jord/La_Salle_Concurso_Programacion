module.exports = app => {    
    var router = require("express").Router();
    const TestComprobationController = require("../controllers/testComprobation.controller");

    
    router.put("/comments/:id", TestComprobationController.addComment);    


    app.use('/test-comprobation', router);
}