module.exports = app => {    
    var router = require("express").Router();
    const VerificationSiteListController = require("../controllers/verificationSiteList.controller");

    
    router.put("/comments/:id", VerificationSiteListController.addComment);    


    app.use('/verification-site-list', router);
}