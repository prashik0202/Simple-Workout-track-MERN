const express = require('express');
const router = express.Router();

const { userLogin , userSignup }  = require('../controllers/userController');
// login user:
router.post('/login',userLogin);

//signup user: 
router.post('/signup',userSignup);

module.exports = router;
