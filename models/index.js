const dbConfig = require('../config/dbConfig.js');
const Logger = require('../middleware/logger.js')
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: 'mysql',
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    Logger.info('connected..')
})
.catch(err => {
    Logger.error('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.Model.js')(sequelize, DataTypes)
db.orgs = require('./org.model.js')(sequelize, DataTypes)
db.inventories = require('./inventory.model.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    Logger.info('yes re-sync done!')
})



// 1 to Many Relation

db.inventories.hasOne(db.orgs)


db.orgs.belongsTo(db.inventories)


db.inventories.hasOne(db.users)


db.users.belongsTo(db.inventories)




module.exports = db
