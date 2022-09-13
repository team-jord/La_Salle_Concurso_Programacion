module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidate", {
        name: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        }
    });
    return Candidate;
};
