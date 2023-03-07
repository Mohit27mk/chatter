const Group=require('../models/group');
const Message=require('../models/message');
const User=require('../models/user');
const UserGroup=require('../models/usergroup');

exports.createGroup=async(req,res,next)=>{
    const users=req.body.users;
    const groupname=req.body.groupname;
    console.log(req.user.dataValues.id)
    // console.log(users)
    const group=await Group.create({name:groupname});
     await group.addUser(req.user.dataValues.id,{through: 'UserGroup'});
     for(let i=0;i<users.length;i++){
        await group.addUser(users[i].id,{through: 'UserGroup'});
     }
   res.status(200).json({message:"Group created",group});
}

exports.getGroups=async(req,res,next)=>{
    
    try{
        const userGroups = await UserGroup.findAll({ 
        where: { userId: req.user.dataValues.id }, 
        include: [{ model: Group }]
      });
    
      res.status(200).json({userGroups});
    }
      catch(err){
        console.log(err);
        res.status(400);
      }
}

exports.removeUserFromGroup=async(req,res,next)=>{
try{
  const groupId=req.body.groupId;
  const userId=req.query.userId;
  const group = await Group.findByPk(groupId);
  const user = await User.findByPk(userId);
  await group.removeUser(user);
  res.status(200).json({message:"deleted"});
}catch(err){
  console.log(err);
  res.status(400);
}
}