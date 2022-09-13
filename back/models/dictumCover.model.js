module.exports = (sequelize, Sequelize) => {
    const DictumCover = sequelize.define("dictumCover", {  
        applies: {
            type: Sequelize.JSON
        },
        folio: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.JSON
        },
    });
    return DictumCover;
};
