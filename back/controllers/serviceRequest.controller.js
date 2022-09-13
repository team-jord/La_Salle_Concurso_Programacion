const db = require("../models");
const ServiceRequest = db.serviceRequest;
const TechnicalFile = db.technicalFile;

exports.create = (req, res) => {
    ServiceRequest.create(req.body.formData)
    .then(data => {
            TechnicalFile.update({ serviceRequestId: data.id }, { where: { id: req.body.fileId } })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el ServiceRequest."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    ServiceRequest.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los ServiceRequest."
            });
        });
};

// Encontrar ServiceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ServiceRequest.findByPk(id)
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

// Actualizar ServiceRequest por id
exports.update = (req, res) => {
    const id = req.params.id;

    ServiceRequest.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ServiceRequest se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al ServiceRequest con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar ServiceRequest con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    ServiceRequest.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            console.log(num)
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al ServiceRequest con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar ServiceRequest con id = " + id
            });
        });
};

// Eliminar un ServiceRequest por id
exports.delete = (req, res) => {
    const id = req.params.id;

    ServiceRequest.destroy({
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
    ServiceRequest.destroy({
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
