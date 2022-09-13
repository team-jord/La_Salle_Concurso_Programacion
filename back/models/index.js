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

db.proposal = require("./proposal.model")(sequelize, Sequelize);
db.candidate = require("./candidate.model")(sequelize, Sequelize);
db.vote = require("./vote.model")(sequelize, Sequelize);
db.voter = require("./voter.model")(sequelize, Sequelize);

db.candidate.hasMany(db.proposal);
db.proposal.belongsTo(db.candidate);

db.voter.hasMany(db.vote);
db.vote.belongsTo(db.voter);

db.proposal.hasMany(db.vote);
db.vote.belongsTo(db.proposal);


module.exports = db;    