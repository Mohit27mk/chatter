const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');
const userauthentication=require('../middleware/auth')


router.post('/add-message/:groupId',userauthentication.authenticate,messageController.postAddMessage);

router.get('/get-messages/:groupId',userauthentication.authenticate,messageController.getMessages);




module.exports = router;