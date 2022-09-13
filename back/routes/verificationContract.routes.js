module.exports = app => {    
    var router = require("express").Router();
    const verificationContractController = require("../controllers/verificationContract.controller");

    router.post("/", verificationContractController.create);    

    router.get("/:id", verificationContractController.findOne);    
    
    router.put("/comments/:id", verificationContractController.addComment);    

    router.put("/:id", verificationContractController.update);    

    app.use('/verification-contract', router);
}