const express=require('express');
const router=express.Router();

const adminController=require('../controllers/admin')
const userauthentication=require('../middleware/auth')

router.post('/make-admin',userauthentication.authenticate,adminController.makeGroupAdmin);
router.get('/check-admin',userauthentication.authenticate,adminController.checkAdmin);

router.post('/removeAdmin',userauthentication.authenticate,adminController.removeAdmin);


module.exports = router;