module.exports = app =>{
    const VoteController = require("../controllers/vote.controller");
    var router = require("express").Router();

    router.post("/", VoteController.create);

    router.get("/", VoteController.findAll);

    router.get("/:userId", VoteController.findByUserId);

    app.use('/vote', router);
}

