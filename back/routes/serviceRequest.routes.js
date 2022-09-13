module.exports = app => {    
    var router = require("express").Router();
    const serviceRequestController = require("../controllers/serviceRequest.controller");

    router.post("/", serviceRequestController.create);    

    router.get("/:id", serviceRequestController.findOne);    
    
    router.put("/comments/:id", serviceRequestController.addComment);    

    router.put("/:id", serviceRequestController.update);    

    app.use('/service-request', router);
}