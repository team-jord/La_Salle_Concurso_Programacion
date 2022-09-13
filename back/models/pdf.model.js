module.exports = (sequelize, Sequelize) => {
    const PDF = sequelize.define("pdf", {  
        fileId:{
            type: Sequelize.INTEGER
        },
    });
    return PDF;
};
