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
const ArchieveMessage=require('../models/archievedmessage');


const cors=require("cors");
const app=express();


// ["http://127.0.0.1:5501"," http://127.0.0.1:5501/socket.io"]
app.use(cors({
    origin:'*',
    credentials:true,
}));

// const server = require('http').createServer(app)
const io = require('socket.io')(8000,{
    cors: {
        origin: '*',
      }
});
io.on('connection', socket => {
    socket.on('send-message', room => {
        io.emit('receive-message', room);
    });
})



app.use(bodyParser.json({ extended: true }));

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/group',groupRoutes);

User.hasMany(ArchieveMessage);
ArchieveMessage.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(User);
User.belongsToMany(Group,{through:UserGroup})
Group.belongsToMany(User,{through:UserGroup})
Group.hasMany(Message);
Message.belongsTo(Group);
Group.hasMany(ArchieveMessage);
ArchieveMessage.belongsTo(Group);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);


sequelize.sync()
.then(result=>{
    app.listen(process.env.PORT);
}).catch(err=>{
    console.log(err);
});