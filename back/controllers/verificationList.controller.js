const db = require("../models");
const VerificationContract = db.verificationContract;
const VerificationList = db.verificationList;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    VerificationList.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar VerificationList con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    VerificationList.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al VerificationList con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar VerificationList con id = " + id
            });
        });
};
