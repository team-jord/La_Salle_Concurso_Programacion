module.exports = app => {    
    var router = require("express").Router();
    const DictumController = require("../controllers/dictum.controller");

    
    router.put("/comments/:id", DictumController.addComment);    


    app.use('/dictum', router);
}