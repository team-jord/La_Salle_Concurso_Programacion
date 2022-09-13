module.exports = app => {    
    var router = require("express").Router();
    const priceRequestController = require("../controllers/priceRequest.controller");

    router.post("/", priceRequestController.create);    

    router.get("/:id", priceRequestController.findOne);    
    
    router.put("/comments/:id", priceRequestController.addComment);    

    router.put("/:id", priceRequestController.update);    

    app.use('/price-request', router);
}