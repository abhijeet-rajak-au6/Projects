const {Router} = require("express");

const {userLogin,userRegister,logout,uploadData,sendMail,acceptInvite} = require('../Controller/userController');
const {authentication} = require('../middleware/Auth');

const router =  Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.delete('/logout',authentication,logout);
router.post('/checkAuth',authentication);
router.post('/uploadData/:_id',authentication,uploadData);
router.post('/sendEmail/:email/:trelloId',authentication,sendMail);
router.get('/acceptInvitation/:email/:trelloId',acceptInvite);
// router.get('/getUserData',authentication,getUserData)
module.exports = router;