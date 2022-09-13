const db = require("../models");
const VerificationListAnexB = db.verificationListAnexB;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    VerificationListAnexB.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar VerificationListAnexB con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    VerificationListAnexB.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al VerificationListAnexB con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar VerificationListAnexB con id = " + id
            });
        });
};
