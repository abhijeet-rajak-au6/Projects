const {Router} = require("express");

const {userLogin,userRegister,logout,uploadData, getUserData} = require('../Controller/userController');
const {authentication} = require('../middleware/Auth');

const router =  Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.delete('/logout',authentication,logout);
router.post('/checkAuth',authentication);
router.post('/uploadData',authentication,uploadData);
router.get('/getUserData',authentication,getUserData)
module.exports = router;