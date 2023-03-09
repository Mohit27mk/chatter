const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message');
const userauthentication=require('../middleware/auth')

const multer = require('multer');
const upload = multer();

router.post('/add-message/:groupId',userauthentication.authenticate,messageController.postAddMessage);

router.post('/add-file/:groupId',upload.single('myFile'),userauthentication.authenticate,messageController.postAddFile);

router.get('/get-messages/:groupId',userauthentication.authenticate,messageController.getMessages);




module.exports = router;