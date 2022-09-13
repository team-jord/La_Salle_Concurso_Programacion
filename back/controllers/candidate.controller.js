const db = require("../models");
const Candidate = db.candidate;

exports.create = async (req, res) => {

    req.body.img = req.file.key

    Candidate.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el Candidate."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    Candidate.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los Candidate."
            });
        });
};

exports.findAllDetail = (req, res) => {
    Candidate.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los Candidate."
            });
        });
};

// Encontrar ServiceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Candidate.findByPk(id)
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
    Candidate.findByPk({
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

// Actualizar Candidate por id
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Actualización de expediente técnico
        let num = await Candidate.update(req.body, { where: { id: id } });

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

    Candidate.destroy({
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
    Candidate.destroy({
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
