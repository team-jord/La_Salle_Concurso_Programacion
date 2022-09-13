module.exports = (sequelize, Sequelize) => {
    const VerificationSiteList = sequelize.define("verificationSiteList", {
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
    return VerificationSiteList;
};
