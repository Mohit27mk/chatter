const express=require('express');
const router=express.Router();

const groupController=require('../controllers/group')
const userauthentication=require('../middleware/auth')

router.post('/create-group',userauthentication.authenticate,groupController.createGroup);
router.get('/get-groups',userauthentication.authenticate,groupController.getGroups);


module.exports = router;