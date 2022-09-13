module.exports = (sequelize, Sequelize) => {
    const FileSharing = sequelize.define("fileSharing", {  
        limitDate: {
            type: Sequelize.DATE
        },
    });
    return FileSharing;
};
