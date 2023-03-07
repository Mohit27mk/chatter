const express=require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const sequelize=require('./util/database');

const userRoutes=require('./routes/user');
const messageRoutes=require('./routes/message');
const groupRoutes=require('./routes/group');
const adminRoutes=require('./routes/admin');

const User=require('./models/user');
const Message=require('./models/message');
const Group=require('./models/group');
const UserGroup=require('./models/usergroup');

const cors=require("cors");
const { request } = require('express');
const app=express();

app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true,
}));

app.use(bodyParser.json({ extended: true }));

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/group',groupRoutes);

User.hasMany(Message);
Message.belongsTo(User);
User.belongsToMany(Group,{through:UserGroup})
Group.belongsToMany(User,{through:UserGroup})
Group.hasMany(Message);
Message.belongsTo(Group);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);


sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT);
}).catch(err=>{
    console.log(err);
});