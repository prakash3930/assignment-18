const express = require('express');
const router = express.Router();
const { registra, login, password_updatet, profile_update, profile } = require('../Controllers/Auth');
const { verifyRegistar } = require('../Middlewares/VeryfiToken.middleware');



router.post('/registration',registra);
router.post('/login',login);
router.post("/password-update",verifyRegistar,password_updatet);
router.post("/profile-update",verifyRegistar,profile_update);
router.get("/profile",verifyRegistar,profile);



module.exports = router;