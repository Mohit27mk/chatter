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

exports.postAddFile=async(req,res,next)=>{
    try{
        
        const fileData=req.file.buffer;
        const filename=req.file.originalname;
        
        const fileURL=await S3services.uploadToS3(fileData,filename);
        
        res.status(200).json({fileURL,success:true});
    }catch(err){
        console.log(err);
    res.status(500).json({fileURL:'',success:false,err:err});
    } 
}