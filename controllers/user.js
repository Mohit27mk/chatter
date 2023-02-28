const User=require('../models/user');
const bcrypt=require('bcrypt');


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