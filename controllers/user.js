const User=require('../models/user');
const UserGroup=require('../models/usergroup');
const Group=require('../models/group');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function isstringinvalid(string){
    if(string==undefined||string.length==0){
        return true;
    }
    return false;
}

exports.postAddUser=async(req,res,next)=>{
    try{
   const name=req.body.name;
   const email=req.body.email;
   const phoneno=req.body.phoneno;
   const password=req.body.password;
   
   if(isstringinvalid(name)||isstringinvalid(email)||isstringinvalid(password)||isstringinvalid(phoneno)){
   return res.status(400).json({message:"Something is missing"});
   }
   const phonenoexist=await User.findOne({ where: { phoneno: phoneno } });
   const emailExists = await User.findOne({ where: { email: email } });
   if (emailExists ) {
    return res.send({Email:"exist"});
   }
 if(phonenoexist){
    return res.send({Phoneno:"exist"});
 }
      bcrypt.hash(password,10,async(err,hash)=>{
       if(err){
        throw new Error();
       }
       const data=await User.create({name:name,email:email,phoneno:phoneno,password:hash})
       res.status(201).json({userDetails:data,success:true});
      });       
}catch(err){
        console.log(err);
        res.status(400).json({message:"Something went wrong",err});
    }
}

function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.JWT_SECRET_KEY);
}

exports.postLoginUser=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        
        if(isstringinvalid(email)||isstringinvalid(password)){
            res.status(400).json({message:"Something is missing"});
           }

        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
            bcrypt.compare(password,emailExists.dataValues.password,(err,result)=>{
                if(err){
                    throw new Error("User not authorized");
                }
                if(result===true){
                    res.status(201).json({login:"Login succesful",token:generateAccessToken(emailExists.id,emailExists.name),name:emailExists.name});   
                }else{
                    res.status(401).json({message:"password is incorrect"});
                }
            })
        }else{
            res.status(404).json({login:"User not found)"}); 
        }
      
     }catch(err){
             res.status(500).json({message:err});
         }
};

exports.getUsers=async(req,res,next)=>{
   try{
    let users;
    if(req.query.groupId){
         users = await UserGroup.findAll({ 
            where: { groupId:req.query.groupId}, 
            include: [{ model: User }]
          });
        //   console.log(users[0].dataValues.userId);
          users=users.filter((user)=>user.dataValues.userId!=req.user.id);
    }else{
         users = await User.findAll();
         users=users.filter((user)=>user.id!=req.user.id);
    }
     
    res.status(200).json({users});
   }catch(err){
    console.log(err);
   }

}

