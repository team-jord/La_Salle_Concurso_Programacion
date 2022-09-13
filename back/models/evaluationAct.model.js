module.exports = (sequelize, Sequelize) => {
    const EvaluationAct = sequelize.define("evaluationAct", {
        visitorName: {
            type: Sequelize.STRING
        },
        visitorJob: {
            type: Sequelize.STRING
        },
        visitorID: {
            type: Sequelize.STRING
        },
        visitorIDNumber: {
            type: Sequelize.STRING
        },
        visitorIssuedBy: {
            type: Sequelize.STRING
        },
        visitorAddress: {
            type: Sequelize.STRING
        },
        firstWitnessName: {
            type: Sequelize.STRING
        },
        firstWitnessID: {
            type: Sequelize.STRING
        },
        firstWitnessIDNumber: {
            type: Sequelize.STRING
        },
        firstWitnessIssuedBy: {
            type: Sequelize.STRING
        },
        firstWitnessAddress: {
            type: Sequelize.STRING
        },
        secondWitnessName: {
            type: Sequelize.STRING
        },
        secondWitnessID: {
            type: Sequelize.STRING
        },
        secondWitnessIDNumber: {
            type: Sequelize.STRING
        },
        secondWitnessIssuedBy: {
            type: Sequelize.STRING
        },
        secondWitnessAddress: {
            type: Sequelize.STRING
        },
        visitObject: {
            type: Sequelize.STRING
        },
        visitDate: {
            type: Sequelize.DATEONLY
        },
        visitStartTime: {
            type: Sequelize.TIME
        },
        visitEndTime: {
            type: Sequelize.TIME
        },
        visitCircumstances: {
            type: Sequelize.TEXT
        },
        noConformities: {
            type: Sequelize.JSON
        },
        observations: {
            type: Sequelize.JSON
        },
        actionsDocumentation: {
            type: Sequelize.JSON
        },
        fileType: {
            type: Sequelize.BOOLEAN
        },
        comments: {
            type: Sequelize.JSON
        }
    });
    return EvaluationAct;
};
