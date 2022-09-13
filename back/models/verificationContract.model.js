module.exports = (sequelize, Sequelize) => {
    const VerificationContract = sequelize.define("verificationContract", {        
        signDate: {
            type: Sequelize.DATEONLY
        },
        comments:{
            type: Sequelize.JSON
        }
    });
    return VerificationContract;
};
