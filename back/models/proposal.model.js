module.exports = (sequelize, Sequelize) => {
    const Proposal = sequelize.define("proposal", {        
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        fund: {
            type: Sequelize.DOUBLE
        },
        min: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.STRING
        },
        questionnaire:{
            type: Sequelize.JSON
        }
    });
    return Proposal;
};
