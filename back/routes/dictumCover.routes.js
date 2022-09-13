module.exports = app => {    
    var router = require("express").Router();
    const DictumCoverController = require("../controllers/dictumCover.controller");

    
    router.put("/comments/:id", DictumCoverController.addComment);    


    app.use('/dictum-cover', router);
}