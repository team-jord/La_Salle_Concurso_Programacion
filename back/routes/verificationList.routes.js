module.exports = app => {    
    var router = require("express").Router();
    const VerificationListController = require("../controllers/verificationList.controller");

    
    router.put("/comments/:id", VerificationListController.addComment);    


    app.use('/verification-list', router);
}