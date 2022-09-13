module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidate", {
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        secondSurname: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        }
    });
    return Candidate;
};
