const Message=require('../models/message');
const User=require('../models/user');

exports.postAddMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        const userId=req.user.id;
        const data=await Message.create({message:message,userId:userId});
        res.status(200).json({data});
    }catch(err){
console.log(err);
    }

}

exports.getMessages=async(req,res,next)=>{
    try{ 
    const messages=await Message.findAll({include:User});
    res.status(200).json({messages});
    }catch(err){ 
        console.log(err);
    }
}