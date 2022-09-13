module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {        
        name: {
            type: Sequelize.STRING
        },
        parentSurname: {
            type: Sequelize.STRING
        },
        motherSurname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    });
    return User;
};
