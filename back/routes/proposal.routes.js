module.exports = app => {    
    var router = require("express").Router();
    const ProposalController = require("../controllers/proposal.controller");

    router.get("/:id", ProposalController.findOne);    

    router.post("/", ProposalController.create);    

    app.use('/proposal', router);
}