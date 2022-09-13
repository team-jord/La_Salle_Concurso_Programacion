module.exports = app =>{
    const UserController = require("../controllers/user.controller");
    var router = require("express").Router();

    router.post("/", UserController.create);

    router.post("/login", UserController.login);

    router.get("/",  UserController.findAll);
    
    app.use('/user/', router);
}

