const db = require("../models");
const TechnicalFile_evaluationAct = db.technicalFile_evaluationAct;
const EvaluationAct = db.evaluationAct;


exports.createEvaluactionACt = async (req, res) => {
    const fileId = req.params.fileId;

    try {
        let evaluationAct = {
            visitorName: "",
            visitorJob: "",
            visitorID: "",
            visitorIDNumber: "",
            visitorIssuedBy: "",
            visitorAddress: "",
            firstWitnessName: "",
            firstWitnessID: "",
            firstWitnessIDNumber: "",
            firstWitnessIssuedBy: "",
            firstWitnessAddress: "",
            secondWitnessName: "",
            secondWitnessID: "",
            secondWitnessIDNumber: "",
            secondWitnessIssuedBy: "",
            secondWitnessAddress: "",
            visitObject: "",
            visitCircumstances: "",
            noConformities: null,
            observations: null,
            actionsDocumentation: null,
            fileType: false,
        }

        const evaluationActResponse = await EvaluationAct.create(evaluationAct);

        let technicalFile_evaluationAct = {
            technicalFileId: fileId,
            evaluationActId: evaluationActResponse.id,
        }

        TechnicalFile_evaluationAct.create(technicalFile_evaluationAct).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al registrar el technicalFile_evaluationAct."
                });
            });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Ocurrio un error al crear la evaluactionAct."
        });
    }
};


exports.deleteEvaluationAct = async (req, res) => {
    const actId = req.params.actId;

    try {
        const response1 = await TechnicalFile_evaluationAct.destroy({ where: { evaluationActId: actId } });

        if (response1 == 1) {
            const response2 = await EvaluationAct.destroy({
                where: { id: actId }
            });
            if (response2 == 1) {
                res.send({ message: 'éxito Eliminando la acta de evaluación' });
            }
        }
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Ocurrio un error al eliminar la evaluactionAct."
        });
    }
}

// Encontrar por id de expediente técnico
exports.findByFileId = (req, res) => {
    const fileId = req.params.fileId;

    TechnicalFile_evaluationAct.findAll({
        where: { technicalFileId: fileId },
        include: [
            { model: db.technicalFile, as: 'technicalFile' },
            { model: db.evaluationAct, as: 'evaluationAct' }
        ]
    }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Dictum con id = " + id
            });
        });
};

// Encontrar por id de acta
exports.findByActId = (req, res) => {
    const actId = req.params.actId;

    TechnicalFile_evaluationAct.findAll({
        where: { evaluationActId: actId },
        include: [
            { model: db.evaluationAct, as: 'evaluationAct' }
        ]
    }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Evaluation Act con id = " + id
            });
        });
};

// Actualizar acta
exports.updateAct = (req, res) => {
    const actId = req.params.actId;

    EvaluationAct.update(req.body, { where: { id: actId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Dictum con id = " + id
            });
        });
};

exports.updateFileType = (req, res) => {
    const actId = req.params.actId;

    EvaluationAct.update({fileType: req.body}, { where: { id: actId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Dictum con id = " + id
            });
        });
};

exports.uploadComment = (req, res) => {
    const actId = req.params.actId;

    EvaluationAct.update({comments: req.body}, { where: { id: actId } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Dictum con id = " + id
            });
        });
};

