module.exports = (sequelize, Sequelize) => {
    const TestComprobation = sequelize.define("testComprobation", {
        date: {
            type: Sequelize.DATEONLY
        },
        resistanceEquipment: {
            type: Sequelize.STRING
        },
        resistanceDate: {
            type: Sequelize.DATEONLY
        },
        resistanceResult: {
            type: Sequelize.STRING
        },
        resistanceisOk: {
            type: Sequelize.BOOLEAN
        },
        continuityEquipment: {
            type: Sequelize.STRING
        },
        continuityDate: {
            type: Sequelize.DATEONLY
        },
        continuityResult: {
            type: Sequelize.STRING
        },
        continuityisOk: {
            type: Sequelize.BOOLEAN
        },
        polarityEquipment: {
            type: Sequelize.STRING
        },
        polarityDate: {
            type: Sequelize.DATEONLY
        },
        polarityResult: {
            type: Sequelize.STRING
        },
        polarityisOk: {
            type: Sequelize.BOOLEAN
        },
        electrodeResistanceEquipment: {
            type: Sequelize.STRING
        },
        electrodeResistanceDate: {
            type: Sequelize.DATEONLY
        },
        electrodeResistanceResult: {
            type: Sequelize.STRING
        },
        electrodeResistanceisOk: {
            type: Sequelize.BOOLEAN
        },
        comments: {
            type: Sequelize.JSON
        },

    });
    return TestComprobation;
};
