const db = require("../models");
const PriceRequest = db.priceRequest;
const TechnicalFile = db.technicalFile;

exports.create = (req, res) => {
    PriceRequest.create(req.body.formData)
        .then(data => {
        
            console.log(data)
            TechnicalFile.update({ priceRequestId: data.id }, { where: { id: req.body.fileId } })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el PriceRequest."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    PriceRequest.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los PriceRequest."
            });
        });
};

// Encontrar PriceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PriceRequest.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar PriceRequest con id = " + id
            });
        });
};

// Actualizar PriceRequest por id
exports.update = (req, res) => {
    const id = req.params.id;

    PriceRequest.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PriceRequest se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al PriceRequest con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar PriceRequest con id = " + id
            });
        });
};

exports.addComment = (req, res) => {
    const id = req.params.id;

    PriceRequest.update({ comments: req.body }, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ok"
                });
            } else {
                res.send({
                    message: `No se encontro al PriceRequest con id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar PriceRequest con id = " + id
            });
        });
};

// Eliminar un PriceRequest por id
exports.delete = (req, res) => {
    const id = req.params.id;

    PriceRequest.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "PriceRequest eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el PriceRequest con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar PriceRequest con id = " + id
            });
        });
};

// Eliminar todos los ServiceRequests de la base de datos
exports.deleteAll = (req, res) => {
    PriceRequest.destroy({
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
