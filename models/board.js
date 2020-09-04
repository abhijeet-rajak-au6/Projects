const {Schema,model} = require('mongoose');

const boardSchema = Schema({

    userId:{
        type:Schema.Types.ObjectId
    },
    refBoardId:{
        type:Schema.Types.ObjectId,
        default:null
    },
    boardName:{
        type:String
    },
    onHoldItems:[],
    progressItems:[],
    backlogItems:[],
    completeItems:[]
});

const boardModel = model('board',boardSchema);
module.exports= boardModel;


