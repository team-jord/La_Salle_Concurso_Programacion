const db = require("../models");
const VerificationSiteList = db.verificationSiteList;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    VerificationSiteList.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar VerificationSiteList con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    VerificationSiteList.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al VerificationSiteList con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar VerificationSiteList con id = " + id
            });
        });
};
