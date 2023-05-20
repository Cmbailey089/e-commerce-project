const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primarayKey:true,
      autoIncrement:true
    },
    product_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL(1,2).UNSIGNED.ZEROFILL,
      allowNull:false,
      validate: {
        DECIMAL: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 10,
      validate: {
        isNumeric:true
      }
    },

    category_id: {
      type: DataTypes.INTEGER,
       reference: {
        model:'catorgory',
        key:'id'
      }
  }
 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
