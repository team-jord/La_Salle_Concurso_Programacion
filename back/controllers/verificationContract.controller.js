const db = require("../models");
const VerificationContract = db.verificationContract;
const TechnicalFile = db.technicalFile;

exports.create = (req, res) => {
    VerificationContract.create(req.body.formData)
        .then(data => {        
            TechnicalFile.update({ verificationContractId: data.id }, { where: { id: req.body.fileId } })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el VerificationContract."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    VerificationContract.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los VerificationContract."
            });
        });
};

// Encontrar VerificationContract por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    VerificationContract.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar VerificationContract con id = " + id
            });
        });
};

// Actualizar VerificationContract por id
exports.update = (req, res) => {
    const id = req.params.id;

    VerificationContract.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "VerificationContract se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al VerificationContract con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar VerificationContract con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    VerificationContract.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al VerificationContract con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar VerificationContract con id = " + id
            });
        });
};

// Eliminar un VerificationContract por id
exports.delete = (req, res) => {
    const id = req.params.id;

    VerificationContract.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "VerificationContract eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el VerificationContract con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar VerificationContract con id = " + id
            });
        });
};

// Eliminar todos los ServiceRequests de la base de datos
exports.deleteAll = (req, res) => {
    VerificationContract.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} ServiceRequests fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};
