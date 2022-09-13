const db = require("../models");
const DictumCover = db.dictumCover;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    DictumCover.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar DictumCover con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    DictumCover.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al DictumCover con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar DictumCover con id = " + id
            });
        });
};
