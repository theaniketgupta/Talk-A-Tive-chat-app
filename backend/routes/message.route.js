const express= require('express');
const {auth}= require('../middlewares/authMiddleware')
const router= express.Router();
const {sendMessage, getAllMessage}=require('../controllers/message.controller')

router.route('/').post(auth, sendMessage);
router.route('/:chatId').get(auth, getAllMessage);

module.exports= router;