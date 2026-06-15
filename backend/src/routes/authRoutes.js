const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');

const {register, login} = require('../controllers/auth')

router.post('/register' , register);
router.post('/login' , login);
router.get('/me', authMiddleware , (req , res)=>{
    res.status(200).json(req.user);
})

module.exports = router;