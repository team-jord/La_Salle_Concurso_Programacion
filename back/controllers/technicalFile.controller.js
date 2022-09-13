const { priceRequest } = require("../models");
const db = require("../models");
const TechnicalFile = db.technicalFile;
const ServiceRequest = db.serviceRequest;
const PriceRequest = db.priceRequest;
const VerificationContract = db.verificationContract;
const VerificationList = db.verificationList;
const CoreFile = db.coreFile;
const VerificationSiteList = db.verificationSiteList;
const VerificationListAnexB = db.verificationListAnexB;
const TestComprobation = db.testComprobation;
const Dictum = db.dictum;
const DictumCover = db.dictumCover;

exports.create = async (req, res) => {

    let serviceRequest = {
        installationStreet: "",
        installationExtNumber: "",
        installationIntNumber: "",
        installationSuburb: "",
        installationTown: "",
        installationCity: "",
        installationState: "",
        installationPC: "",
        phone: "",
        cellphone: "",
        email: "",
        commercialName: "",
        rfc: "",
        curp: "",
        petitionerID: "",
        petitionerPhone: "",
        petitionerCellphone: "",
        petitionerEmail: "",
        visitorName: "",
        visitorID: "",
        visitorPhone: "",
        visitorCellphone: "",
        visitorEmail: "",
        conflictOfInterest: null,
        imparcialityRisk: null,
        comments: null,
    }

    let serviceRequestResult = await ServiceRequest.create(serviceRequest);

    let priceRequest = {
        place: "",
        controlNumber: null,
        numberOfVisits: null,
        verificationCost: null,
        isMajorKW: req.body.isMajorKW,
        isDangerous: req.body.isDangerous,
        methodOfPayment: null,
        advance: null,
        settlement: null,
        comments: null
    }

    let priceRequestResult = await PriceRequest.create(priceRequest);

    let verificationContract = {
        comments: null
    }

    let verificationContractResult = await VerificationContract.create(verificationContract);

    let corefile = {
        scian: "",
        socialReason: "",
        name: "",
        tension: null,
        capacity: "",
        installedCharge: "",
        verificationExtend: "",
        kindOfLocation: "",
        kindOfInstallation: "",
        petitionerName: "",
    }

    let coreFileResult = await CoreFile.create(corefile);

    let verificationList = {
        answers: null,
    }

    let verificationListResult = await VerificationList.create(verificationList)

    let verificationSiteList = {
        answers: null,
    }

    let verificationSiteListResult = await VerificationSiteList.create(verificationSiteList)

    let verificationListAnexB = {
        answers: null,
    }

    let verificationListAnexBResult = await VerificationListAnexB.create(verificationListAnexB)

    let testComprobation = {
        resistanceEquipment: "",
        resistanceResult: "",
        resistanceisOk: null,
        continuityEquipment: "",
        continuityResult: "",
        continuityisOk: null,
        polarityEquipment: "",
        polarityResult: "",
        polarityisOk: null,
        electrodeResistanceEquipment: "",
        electrodeResistanceResult: "",
        electrodeResistanceisOk: null,
    }

    let testComprobationResult = await TestComprobation.create(testComprobation)

    let dictum = {
        folio: "",
        notes: ""
    }

    let dictumResult = await Dictum.create(dictum)

    let dictumCover = {
        applies: null,
        folio: ""
    }

    let dictumCoverResult = await DictumCover.create(dictumCover)

    req.body.serviceRequestId = serviceRequestResult.id;
    req.body.priceRequestId = priceRequestResult.id;
    req.body.verificationContractId = verificationContractResult.id;
    req.body.coreFileId = coreFileResult.id;
    req.body.verificationListId = verificationListResult.id;
    req.body.verificationSiteListId = verificationSiteListResult.id;
    req.body.verificationListAnexBId = verificationListAnexBResult.id;
    req.body.testComprobationId = testComprobationResult.id;
    req.body.dictumId = dictumResult.id;
    req.body.dictumCoverId = dictumCoverResult.id;

    TechnicalFile.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al registrar el technicalFile."
            });
        });
};

// Recuperar todos los ServiceRequests de la base de datos
exports.findAll = (req, res) => {
    TechnicalFile.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los TechnicalFile."
            });
        });
};

exports.findAllDetail = (req, res) => {
    TechnicalFile.findAll({
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
                    err.message || "Ocurrio un error al recuperar todos los TechnicalFile."
            });
        });
};

// Encontrar ServiceRequest por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    TechnicalFile.findByPk(id, {
        include: [
            { model: db.serviceRequest, as: 'serviceRequest' },
            { model: db.priceRequest, as: 'priceRequest' },
            { model: db.coreFile, as: 'coreFile' },
            { model: db.verificationContract, as: 'verificationContract' },
            { model: db.verificationList, as: 'verificationList' },
            { model: db.verificationSiteList, as: 'verificationSiteList' },
            { model: db.verificationListAnexB, as: 'verificationListAnexB' },
            { model: db.testComprobation, as: 'testComprobation' },
            { model: db.dictum, as: 'dictum' },
            { model: db.dictumCover, as: 'dictumCover' },
        ]
    })
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
    TechnicalFile.findByPk({
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

// Actualizar TechnicalFile por id
exports.update = async (req, res) => {
    const id = req.params.id;

    try {

        console.log(req.body)

        // Actualización de expediente técnico
        let num = await TechnicalFile.update(req.body, { where: { id: id } });

        // Actualización de service request
        let response1 = await ServiceRequest.update(req.body.serviceRequest, {
            where: { id: req.body.serviceRequest.id }
        })

        // Actualización de priceRequest
        let response2 = await PriceRequest.update(req.body.priceRequest, {
            where: { id: req.body.priceRequest.id }
        });

        //Actualización de datos core 
        let response3 = CoreFile.update(req.body.coreFile, { where: { id: req.body.coreFile.id } })

        //Actualización de contrato de verificación 
        let response4 = VerificationContract.update(req.body.verificationContract, { where: { id: req.body.verificationContract.id } })

        // Actualización de lista de verificación
        let response5 = VerificationList.update(req.body.verificationList, { where: { id: req.body.verificationList.id } })

        // Actualización de lista de verificación en sitio
        let response6 = VerificationSiteList.update(req.body.verificationSiteList, { where: { id: req.body.verificationSiteList.id } })

        // Actualización de lista de verificación en sitio
        let response7 = VerificationListAnexB.update(req.body.verificationListAnexB, { where: { id: req.body.verificationListAnexB.id } })

        // Actualización de lista de verificación en sitio
        let response8 = TestComprobation.update(req.body.testComprobation, { where: { id: req.body.testComprobation.id } })

        // Actualización de dictamen de verificación
        let response9 = Dictum.update(req.body.dictum, { where: { id: req.body.dictum.id } })

        // Actualización de portada dictamen de verificación
        let response10 = DictumCover.update(req.body.dictumCover, { where: { id: req.body.dictumCover.id } })

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

// Eliminar un ServiceRequest por id
exports.delete = (req, res) => {
    const id = req.params.id;

    TechnicalFile.destroy({
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
    TechnicalFile.destroy({
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

    TechnicalFile.update({ files: req.body }, { where: { id: id } })
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

    TechnicalFile.update({ modifications: req.body }, { where: { id: id } })
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
