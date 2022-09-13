module.exports = (sequelize, Sequelize) => {
    const VerificationList = sequelize.define("verificationList", {
        // ? qué fecha  
        date: {
            type: Sequelize.DATEONLY
        },
        answers: {
            type: Sequelize.JSON
        },
        comments:{
            type: Sequelize.JSON
        }
    });
    return VerificationList;
};
