const db = require("../models");
const User = db.user;

const jwtService = require("../services/jwt.service");
const jwtServiceInstance = new jwtService();
var CryptoJS = require("crypto-js");
var sha256 = require('js-sha256');
const encryptSecret = "election";

exports.create = async (req, res) => {
    
    req.body.img = req.file.key

    let userINeKey = await User.findAll({ where: { idINE: req.body.idINE } })

    if (userINeKey[0]) {
        res.status(203).send("Ine que trata de registrar ya existe");        
        return;
    }

    User.findAll({ where: { email: req.body.email } }).then(response1 => {
        if (response1[0]) {
            res.send("usuario existente");
        } else {

            
            // Crear un usuario
            // var decryptedBytes = CryptoJS.AES.decrypt(req.body.password, encryptSecret);
            // var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

            // Guardar Usuario en la base de datos
            User.create(req.body)
                .then(data => {
                    const simpleUsuario = {
                        id: data.id,
                        name: req.body.name,
                        email: req.body.email
                    }

                    jwtServiceInstance.sign(simpleUsuario).then(response => {
                        data = {
                            data,
                            token: response
                        }
                        res.send(data);
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Ocurrio un error al registrar el usuario."
                    });
                });
        }
    })
};

exports.login = async (req, res) => {
    console.log(req.body)
    let dataUser = await User.findAll({ where: { email: req.body.email } })

    if (dataUser.length > 0) {

        dataJson = {
            email: dataUser[0].email,
            password: dataUser[0].password,
            name: dataUser[0].name
        }

        var decryptedBytes = CryptoJS.AES.decrypt(req.body.password, encryptSecret);
        var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

        var decryptedBytes2 = CryptoJS.AES.decrypt(dataUser[0].password, encryptSecret);
        var plaintext2 = decryptedBytes2.toString(CryptoJS.enc.Utf8);

        if ((req.body.email === dataUser[0].email) && (plaintext === plaintext2)) {
            jwtServiceInstance.sign(dataJson).then(response => {
                dataSent = {
                    user: dataUser[0],
                    token: response
                }
                res.send(dataSent);
            })
        } else {
            res.send("Credenciales Incorrectas")
        }
    } else {
        res.send("Credenciales Incorrectas")
    }


};


// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    User.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los User."
            });
        });
};

exports.findAllDetail = (req, res) => {
    User.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los User."
            });
        });
};

// Encontrar ServiceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
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
    User.findByPk({
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

// Actualizar User por id
exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        // Actualización de expediente técnico
        let num = await User.update(req.body, { where: { id: id } });

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

    User.destroy({
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
    User.destroy({
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
