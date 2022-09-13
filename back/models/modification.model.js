module.exports = (sequelize, Sequelize) => {
    const Modification = sequelize.define("modification", {  
        fileId:{
            type: Sequelize.INTEGER
        },
        modified:{
            type: Sequelize.STRING
        },
        modification:{
            type: Sequelize.STRING
        },
    });
    return Modification;
};
