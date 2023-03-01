const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');
const userauthentication=require('../middleware/auth')


router.post('/add-message',userauthentication.authenticate,messageController.postAddMessage);

router.get('/get-messages',userauthentication.authenticate,messageController.getMessages);




module.exports = router;