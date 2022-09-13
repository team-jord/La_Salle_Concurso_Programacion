module.exports = app => {    
    var router = require("express").Router();
    const VerificationListAnexBController = require("../controllers/verificationListAnexB.controller");

    
    router.put("/comments/:id", VerificationListAnexBController.addComment);    


    app.use('/verification-list-anex-b', router);
}