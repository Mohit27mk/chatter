const Message=require('../models/message');
const User=require('../models/user');

exports.postAddMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        const userId=req.user.id;
        const name=req.user.name;
        const data=await Message.create({message:message,userId:userId,name:name});
        res.status(200).json({data});
    }catch(err){
console.log(err);
    }

}

exports.getMessages=async(req,res,next)=>{
    try{
    const lastId=+(req.query.lastId);
    const messages=await Message.findAll({offset: lastId});
    res.status(200).json({messages});
    }catch(err){ 
        console.log(err);
    }
}