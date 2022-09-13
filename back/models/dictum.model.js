module.exports = (sequelize, Sequelize) => {
    const Dictum = sequelize.define("dictum", {  
        folio: {
            type: Sequelize.STRING
        },        
        date: {
            type: Sequelize.DATEONLY
        },
        dangerAreaVisitDate: {
            type: Sequelize.DATEONLY
        },
        notes: {
            type: Sequelize.TEXT
        },    
        comments: {
            type: Sequelize.JSON
        },    
    });
    return Dictum;
};
