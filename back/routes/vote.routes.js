module.exports = app =>{
    const VoteController = require("../controllers/vote.controller");
    var router = require("express").Router();

    router.post("/", VoteController.create);
    
    app.use('/vote', router);
}

