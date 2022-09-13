module.exports = (sequelize, Sequelize) => {
    const VerificationListAnexB = sequelize.define("verificationListAnexB", {
        // ? qué fecha  
        date: {
            type: Sequelize.DATEONLY
        },
        answers: {
            type: Sequelize.JSON
        },
        comments: {
            type: Sequelize.JSON
        },
    });
    return VerificationListAnexB;
};
