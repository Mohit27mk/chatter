const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const ArchieveMessage=sequelize.define('archievemessage',{
id:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
},

message:{
  type:Sequelize.STRING
},name: {
    type: Sequelize.STRING,
    allowNull: false
}
});

module.exports=ArchieveMessage;