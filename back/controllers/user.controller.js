const db = require("../models");
const User = db.user;

const jwtService = require("../services/jwt.service");
const jwtServiceInstance = new jwtService();
var CryptoJS = require("crypto-js");
var sha256 = require('js-sha256');
const encryptSecret = "cfa";

// Crear y guardar un nuevo User
exports.create = (req, res) => {
    User.findAll({ where: { email: req.body.email } }).then(response1 => {
        if (response1[0]) {
            res.send("usuario existente");
        } else {
            // Crear un usuario
            var decryptedBytes = CryptoJS.AES.decrypt(req.body.password, encryptSecret);
            var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

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

// Recuperar todos los Usuarios de la base de datos
exports.findAll = (req, res) => {
    const limit = req.params.limit;
    const offset = req.params.offset;
    User.findAndCountAll({
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al recuperar todos los Users."
            });
        });
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

// Encontrar User por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar User con id = " + id
            });
        });
};

exports.isAdmin = (req, res) => {
    const id = body.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar User con id = " + id
            });
        });
};

// Actualizar User por id
exports.update = (req, res) => {
    const id = req.params.id;

    if (req.body.pwd) {
        var decryptedBytes = CryptoJS.AES.decrypt(req.body.pwd, encryptSecret);
        var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
        req.body.pwd = sha256(plaintext).toUpperCase();
    }

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se encontro al User con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar User con id = " + id
            });
        });
};

// Eliminar un User por id
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User eliminado con exito!"
                });
                //db.sequelize.query("ALTER SEQUENCE \"users_id_seq\" RESTART; UPDATE public.\"users\" SET id = DEFAULT;");
            } else {
                res.send({
                    message: `No se encontro el User con id = ${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar User con id = " + id
            });
        });
};

// Eliminar todos los Users de la base de datos
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users fueron eliminados con exito!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || ""
            });
        });
};
