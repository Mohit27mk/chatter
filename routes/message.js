const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');
const userauthentication=require('../middleware/auth')


router.post('/add-message',userauthentication.authenticate,messageController.postAddMessage);




module.exports = router;