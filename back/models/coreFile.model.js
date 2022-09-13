module.exports = (sequelize, Sequelize) => {
    const CoreFile = sequelize.define("coreFile", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        scian: {
            type: Sequelize.STRING
        },
        socialReason: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        tension: {
            type: Sequelize.BOOLEAN
        },
        capacity: {
            type: Sequelize.STRING
        },
        installedCharge: {
            type: Sequelize.STRING
        },
        verificationExtend: {
            type: Sequelize.STRING
        },
        // public, dangerous, industry, others
        kindOfLocation: {
            type: Sequelize.STRING
        },
        // new, widening, modification, verification, subestation, before
        kindOfInstallation: {
            type: Sequelize.STRING
        },
        petitionerName: {
            type: Sequelize.STRING
        },
    });
    return CoreFile;
};
