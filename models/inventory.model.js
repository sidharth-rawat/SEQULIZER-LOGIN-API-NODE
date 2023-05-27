// const db = require('../models')

module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("inventories", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organizationId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'organizations', // 'fathers' refers to table name
               key: 'id', // 'id' refers to column name in fathers table
            }
         },
         userId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'users', // 'fathers' refers to table name
               key: 'id', // 'id' refers to column name in fathers table
            }
         }
        
    })
    // Inventory.associate = (models) => {
    //     Inventory.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    //   };
    // Inventory.hasOne(db.orgs)
    
    return Inventory

}

