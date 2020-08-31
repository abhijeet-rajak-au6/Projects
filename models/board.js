const {Schema,model} = require('mongoose');

const boardSchema = Schema({

    userId:{
        type:Schema.Types.ObjectId
    },
    onHoldItems:[],
    progressItems:[],
    backlogItems:[],
    completeItems:[]
});

const boardModel = model('board',boardSchema);
module.export = boardModel;


