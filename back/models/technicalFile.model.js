module.exports = (sequelize, Sequelize) => {
    const TechnicalFile = sequelize.define("technicalFile", {
        name: {
            type: Sequelize.STRING
        },
        requirerName: {
            type: Sequelize.STRING
        },
        kva: {
            type: Sequelize.STRING
        },
        installedCharge: {
            type: Sequelize.STRING
        },
        files: {
            type: Sequelize.JSON
        },
        modifications: {
            type: Sequelize.JSON
        }
    });
    return TechnicalFile;
};
