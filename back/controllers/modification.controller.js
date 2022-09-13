const db = require("../models");
const Modification = db.modification;
const TechnicalFile = db.technicalFile;

exports.create = (req, res) => {
    Modification.create(req.body.formData)
    .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el Modification."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    Modification.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Modification."
            });
        });
};

exports.findWithFileId = (req, res) => {
    const fileId = req.params.fileId;

    Modification.findAll({
        where:{fileId: fileId}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Modification con el fileId: " + fileId
            });
        });
};

// Encontrar Modification por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Modification.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar Modification con id = " + id
            });
        });
};

// Actualizar Modification por id
exports.update = (req, res) => {
    const id = req.params.id;

    Modification.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Modification se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al Modification con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar Modification con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    Modification.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            console.log(num)
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al Modification con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar Modification con id = " + id
            });
        });
};

// Eliminar un Modification por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Modification.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Modification eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el Modification con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar Modification con id = " + id
            });
        });
};

// Eliminar todos los ServiceRequests de la base de datos
exports.deleteAll = (req, res) => {
    Modification.destroy({
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
