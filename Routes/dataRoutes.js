const {Router} = require("express");

const {createBoard,getUserData,getTrelloData} = require('../Controller/boardController');
const {authentication} = require('../middleware/Auth')
const router = Router();

router.post('/createBoard',authentication,createBoard);
router.get('/getUserData',authentication,getUserData);
router.get('/getTrelloData/:_id',authentication,getTrelloData);
module.exports=router;