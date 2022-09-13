module.exports = (sequelize, Sequelize) => {
    const PriceRequest = sequelize.define("priceRequest", {        
        place: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATEONLY
        },
        controlNumber: {
            type: Sequelize.STRING
        },
        numberOfVisits: {
            type: Sequelize.INTEGER
        },
        verificationCost: {
            type: Sequelize.FLOAT
        },
        // 
        isMajorKW: {
            type: Sequelize.BOOLEAN
        },
        isDangerous:{
            type: Sequelize.BOOLEAN
        },
        // 
        methodOfPayment: {
            type: Sequelize.STRING
        },
        advance: {
            type: Sequelize.FLOAT
        },
        settlement: {
            type: Sequelize.FLOAT
        },
        comments:{
            type: Sequelize.JSON
        }

    });
    return PriceRequest;
};
