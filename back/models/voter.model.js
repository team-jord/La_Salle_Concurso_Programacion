module.exports = (sequelize, Sequelize) => {
    const Voter = sequelize.define("voter", {
        name: {
            type: Sequelize.STRING
        },
        idINE: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        }
    });
    return Voter;
};
