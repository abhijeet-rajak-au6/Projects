const boardModel = require('../models/board');
const { getUserData } = require('./userController');
module.exports={

    async createBoard(req,res){

        try{
            const {boardName}=req.body;
            // console.log('board Name',boardName);
            req.body.userId = req.userId;
            const board = new boardModel({...req.body});
            const savedBoard = await board.save();
            return res.status(200).send({
                status:'sucess',
                boardDetail:savedBoard
            })
        }
        catch(err){

            return res.status(500).send({
                msg:err.message
            })
        }
       

    },
    async getUserData(req,res){

		try{
            let trelloData;
            const boardQuery =  boardModel.find({});
            console.log(req.userId);
            trelloData =  await boardQuery.find({userId:req.userId});
            console.log('board',trelloData);
            // console.log("ref",boardData[0].refBoardId);

            // if(boardData[0].refBoardId){
            //     trelloData = await boardModel.find({_id:boardData[0].refBoardId});
            //     console.log(trelloData);
            // }
            // else{
            //     trelloData = await boardModel.find({userId:req.userId});
            // }
            console.log('trello Data',trelloData);
			return res.status(200).send({
				status:'success',
				user:trelloData
			})
		}
		catch(err){
            console.log(err);
            return res.status(200).send({
                msg:err.message
            })
		}
    },
    async getTrelloData(req,res){
        try{
            const {_id}=req.params;
            const board = await boardModel.findById(_id);
            return res.status(200).send({
                status:'sucess',
                board,
            })
        }
        catch(err){
            return res.status(200).send({
                msg:err.message
            })
        }
    }
}
