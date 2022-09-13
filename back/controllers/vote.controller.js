const db = require("../models");
const Vote = db.vote;

exports.create = async (req, res) => {
    Vote.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el Vote."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    Vote.findAll({
        order: [
            ["id", "DESC"],
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Vote."
            });
        });
};

exports.findAllDetail = (req, res) => {
    Vote.findAll({
        include: [
            { model: db.serviceRequest, as: 'ServiceRequest' },
            { model: db.coreFile, as: 'CoreFile' }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Vote."
            });
        });
};

exports.findByUserId = (req, res) => {
    const userId = req.params.userId;
    Vote.findAll({where : {userId: userId}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Vote."
            });
        });
};

// Encontrar ServiceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Vote.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Error al recuperar ServiceRequest con id = " + id
            });
        });
};

exports.findOneForServiceRequest = (req, res) => {
    console.log(req)
    Vote.findByPk({
        include: [
            { model: db.serviceRequest, as: 'ServiceRequest' },
            { model: db.coreFile, as: 'CoreFile' }
        ]
    }, id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar ServiceRequest con id = " + id
            });
        });
};

// Actualizar Vote por id
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Actualización de expediente técnico
        let num = await Vote.update(req.body, { where: { id: id } });

        res.send({
            message: "Se actualizó con éxito el expediente!"
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Error al actualizar el expediente"
        });
    }
};

// Eliminar un  por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Vote.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ServiceRequest eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el ServiceRequest con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar ServiceRequest con id = " + id
            });
        });
};

// Eliminar todos los ServiceRequests de la base de datos
exports.deleteAll = (req, res) => {
    Vote.destroy({
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

exports.updateFiles = (req, res) => {
    const id = req.params.id;

    Vote.update({ files: req.body }, { where: { id: id } })
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

exports.addModification = (req, res) => {
    const id = req.params.id;

    Vote.update({ modifications: req.body }, { where: { id: id } })
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
