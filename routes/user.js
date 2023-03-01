const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const userauthentication=require('../middleware/auth')


router.post('/signup',userController.postAddUser);

router.post('/login',userController.postLoginUser);

router.get('/get-users',userauthentication.authenticate,userController.getUsers);


module.exports = router;