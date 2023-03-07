const Admin = require('../models/admin');

exports.makeGroupAdmin = async (req, res) => {
    try{
        let userId;
        if(req.query.userId){
            userId = req.query.userId;
        }else{
            userId = req.user.id;
        }
     const response=await Admin.create({
            groupId: req.body.groupId,
            userId: userId
        })
        res.status(200).json({message:"Successful",response});
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

exports.checkAdmin = async (req, res) => {
    try{
        let userId;
        if(req.query.userId){
            userId = req.query.userId;
        }else{
            userId = req.user.id;
        }
        
        const groupAdmins = await Admin.findAll({
            where : {
                groupId: req.query.groupId,
                userId: userId
            }
        })

        if(groupAdmins[0]){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}



exports.removeAdmin = async (req, res) => {
    try{
     let response=   await Admin.destroy({
            where: {
                groupId: req.body.groupId,
                userId: req.query.userId
            }
        })
        console.log(response);
        res.status(200).json({message:'Successful',response});
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}