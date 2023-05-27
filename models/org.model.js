module.exports = (sequelize, DataTypes) => {

    const Org = sequelize.define("organizations",{

        name:{
            type:DataTypes.STRING,
            
        },
        email:{
            type:DataTypes.STRING,
            
        },
        phone:{
            type:DataTypes.STRING,
            
        },
        countrycode:{
            type:DataTypes.STRING,
            
        },
        created_by:{
            type:DataTypes.STRING,
            
       },
       invntoryId: {
        type: DataTypes.INTEGER,
        references: {
           model: 'inventories', // 'fathers' refers to table name
           key: 'id', // 'id' refers to column name in fathers table
        }
     }
    });
   
  Org.associate = (models) => {
    Org.hasOne(models.Inventory, { foreignKey: 'organizationId' });
  };
    return Org

}