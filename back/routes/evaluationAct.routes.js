module.exports = app => {    
    var router = require("express").Router();
    const EvaluationActController = require("../controllers/evaluationAct.controller");

    router.post("/:fileId", EvaluationActController.createEvaluactionACt);

    router.delete("/:actId", EvaluationActController.deleteEvaluationAct);

    router.get("/:fileId", EvaluationActController.findByFileId);

    router.get("/act-id/:actId", EvaluationActController.findByActId);

    router.put("/:actId", EvaluationActController.updateAct);

    router.put("/file-type/:actId", EvaluationActController.updateFileType);

    router.put("/comment/:actId", EvaluationActController.uploadComment);

    app.use('/evaluation-act', router);
}