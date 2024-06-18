const express =  require('express');
const router = express.Router();
const {createUser,handleLogin} = require('../controllers/user');


router.post('/',createUser);
router.post('/login',handleLogin); 

module.exports = router;