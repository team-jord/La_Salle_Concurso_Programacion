module.exports = (sequelize, Sequelize) => {
    const Vote = sequelize.define("vote", {
        isVoted: {
            type: Sequelize.BOOLEAN
        },
        answers:{
            type: Sequelize.JSON            
        }
    });
    return Vote;
};
