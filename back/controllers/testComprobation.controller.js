const db = require("../models");
const TestComprobation = db.testComprobation;

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TestComprobation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar TestComprobation con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    TestComprobation.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al TestComprobation con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar TestComprobation con id = " + id
            });
        });
};
