const db = require("../models");
const CoreFile = db.coreFile;
const TechnicalFile = db.technicalFile;

exports.create = (req, res) => {
    CoreFile.create(req.body.formData)
    .then(data => {
            console.log(data);
            TechnicalFile.update({ coreFileId: data.id }, { where: { id: req.body.fileId } })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el CoreFile."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    CoreFile.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los CoreFile."
            });
        });
};

// Encontrar CoreFile por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CoreFile.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar CoreFile con id = " + id
            });
        });
};

// Actualizar CoreFile por id
exports.update = (req, res) => {
    const id = req.params.id;

    CoreFile.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CoreFile se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al CoreFile con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar CoreFile con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    CoreFile.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            console.log(num)
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al CoreFile con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar CoreFile con id = " + id
            });
        });
};

// Eliminar un CoreFile por id
exports.delete = (req, res) => {
    const id = req.params.id;

    CoreFile.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CoreFile eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el CoreFile con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar CoreFile con id = " + id
            });
        });
};

// Eliminar todos los ServiceRequests de la base de datos
exports.deleteAll = (req, res) => {
    CoreFile.destroy({
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
