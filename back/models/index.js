const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { HasMany } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: process.env.DB_PORT,
    operatorsAliases: false,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false 
    //     }
    // },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.coreFile = require("./coreFile.model.js")(sequelize, Sequelize);
db.dictum = require("./dictum.model.js")(sequelize, Sequelize);
db.dictumCover = require("./dictumCover.model.js")(sequelize, Sequelize);
db.evaluationAct = require("./evaluationAct.model.js")(sequelize, Sequelize);
db.priceRequest = require("./priceRequest.model.js")(sequelize, Sequelize);
db.serviceRequest = require("./serviceRequest.model.js")(sequelize, Sequelize);
db.technicalFile = require("./technicalFile.model.js")(sequelize, Sequelize);
db.testComprobation = require("./testComprobation.model.js")(sequelize, Sequelize);
db.verificationContract = require("./verificationContract.model.js")(sequelize, Sequelize);
db.verificationList = require("./verificationList.model.js")(sequelize, Sequelize);
db.verificationListAnexB = require("./verificationListAnexB.model.js")(sequelize, Sequelize);
db.verificationSiteList = require("./verificationSiteList.model.js")(sequelize, Sequelize);
db.modification = require("./modification.model.js")(sequelize, Sequelize);
db.pdf = require("./pdf.model.js")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.fileSharing = require("./fileSharing.model")(sequelize, Sequelize);

db.technicalFile_evaluationAct = sequelize.define('technicalFile_evaluationAct', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

db.technicalFile_fileSharing = sequelize.define('technicalFile_fileSharing', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

db.technicalFile_evaluationAct.belongsTo(db.technicalFile);
db.technicalFile_evaluationAct.belongsTo(db.evaluationAct);

db.technicalFile_fileSharing.belongsTo(db.technicalFile);
db.technicalFile_fileSharing.belongsTo(db.fileSharing);

db.coreFile.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.coreFile);

db.dictum.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.dictum);

db.dictumCover.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.dictumCover);
    
db.priceRequest.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.priceRequest);

db.serviceRequest.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.serviceRequest);

db.testComprobation.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.testComprobation);

db.verificationContract.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.verificationContract);

db.verificationList.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.verificationList);

db.verificationListAnexB.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.verificationListAnexB);

db.verificationSiteList.hasMany(db.technicalFile);
db.technicalFile.belongsTo(db.verificationSiteList);

module.exports = db;    