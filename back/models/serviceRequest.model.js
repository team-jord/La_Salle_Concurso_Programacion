module.exports = (sequelize, Sequelize) => {
    const ServiceRequest = sequelize.define("serviceRequest", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        requestDate: {
            type: Sequelize.DATEONLY
        },
        installationStreet: {
            type: Sequelize.STRING
        },
        installationExtNumber: {
            type: Sequelize.STRING
        },
        installationIntNumber: {
            type: Sequelize.STRING
        },
        installationSuburb: {
            type: Sequelize.STRING
        },
        installationTown: {
            type: Sequelize.STRING
        },
        installationCity: {
            type: Sequelize.STRING
        },
        installationState: {
            type: Sequelize.STRING
        },
        installationPC: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        cellphone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        commercialName: {
            type: Sequelize.STRING
        },
        rfc: {
            type: Sequelize.STRING
        },
        curp: {
            type: Sequelize.STRING
        },
        petitionerID: {
            type: Sequelize.STRING
        },
        petitionerPhone: {
            type: Sequelize.STRING
        },
        petitionerCellphone: {
            type: Sequelize.STRING
        },
        petitionerEmail: {
            type: Sequelize.STRING
        },
        visitorName: {
            type: Sequelize.STRING
        },
        visitorID: {
            type: Sequelize.STRING
        },
        visitorPhone: {
            type: Sequelize.STRING
        },
        visitorCellphone: {
            type: Sequelize.STRING
        },
        visitorEmail: {
            type: Sequelize.STRING
        },
        conflictOfInterest: {
            type: Sequelize.BOOLEAN
        },
        imparcialityRisk: {
            type: Sequelize.BOOLEAN
        },
        comments: {
            type: Sequelize.JSON
        },
    });
    return ServiceRequest;
};
