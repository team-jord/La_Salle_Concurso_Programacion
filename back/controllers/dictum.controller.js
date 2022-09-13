const db = require("../models");
const Dictum = db.dictum;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Dictum.findByPk(id)
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

exports.addComment = (req, res) => {
    const id = req.params.id;

    Dictum.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al Dictum con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar Dictum con id = " + id
            });
        });
};
