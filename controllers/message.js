const Message=require('../models/message');
const User=require('../models/user');
const { Op } = require("sequelize");

exports.postAddMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        const userId=req.user.id;
        const name=req.user.name;
        const groupId= +(req.params.groupId);
        // console.log("--------------"+req.params.groupId);
        const data=await Message.create({message:message,userId:userId,groupId:groupId,name:name});
        res.status(200).json({data});
    }catch(err){
console.log(err);
    }

}

exports.getMessages=async(req,res,next)=>{
    try{
    const lastId=+(req.query.lastId);
    const groupId= +(req.params.groupId);
    // console.log("---------"+lastId);
    const messages=await Message.findAll({where: {
        groupId : groupId,
        id: {
            [Op.gt]: lastId
        }
    }
});
    // console.log(messages);
    res.status(200).json({messages});
    }catch(err){ 
        console.log(err);
    }
}