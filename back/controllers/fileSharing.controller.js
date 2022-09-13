const db = require("../models");
const TechnicalFile_fileSharing = db.technicalFile_fileSharing;
const FileSharing = db.fileSharing;


exports.createFileSharing = async (req, res) => {
    const fileId = req.params.fileId;

    try {
        let fileSharing = {
            limitDate: "",
        }

        const fileSharingResponse = await FileSharing.create(fileSharing);

        let technicalFile_fileSharing = {
            technicalFileId: fileId,
            fileSharingId: fileSharingResponse.id,
        }

        TechnicalFile_fileSharing.create(technicalFile_fileSharing).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al registrar el TechnicalFile_fileSharing."
                });
            });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Ocurrio un error al crear la TechnicalFile_fileSharing."
        });
    }
};

// Encontrar por id de expediente técnico
exports.findByFileId = (req, res) => {
    const fileId = req.params.fileId;

    TechnicalFile_fileSharing.findAll({
        where: { technicalFileId: fileId },
        include: [
            { model: db.technicalFile, as: 'technicalFile' },
            { model: db.fileSharing, as: 'fileSharing' }
        ]
    }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar TechnicalFile_fileSharing con id = " + id
            });
        });
};

// Encontrar por id de acta
exports.findByActId = (req, res) => {
    const fileSharingId = req.params.fileSharingId;

    TechnicalFile_fileSharing.findAll({
        where: { fileSharingId: fileSharingId },
        include: [
            { model: db.fileSharing, as: 'fileSharing' }
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

