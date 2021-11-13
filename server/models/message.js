const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({ 
    user1 : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    user2 : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    content : {
        type : String,
    },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = {
    Message,
}