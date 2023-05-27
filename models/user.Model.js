

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middlename: {
            type: DataTypes.INTEGER
        },
        lastname: {
            type: DataTypes.STRING
        },
        
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }, invntoryId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'inventories', // 'fathers' refers to table name
               key: 'id', // 'id' refers to column name in fathers table
            }
        }
    })
    // User.associate = (models) => {
    //     User.belongsTo(models.Inventory, { foreignKey: 'inventoryId' });
    //   };
    
    return User

}