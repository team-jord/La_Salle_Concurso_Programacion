module.exports = app => {    
    var router = require("express").Router();
    const ProposalController = require("../controllers/proposal.controller");

    router.get("/:id", ProposalController.findOne);    

    router.get("/", ProposalController.findAll);    

    router.post("/", ProposalController.create);    

    app.use('/proposal', router);
}