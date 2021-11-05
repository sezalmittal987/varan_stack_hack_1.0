const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let{ addComment } = require('./event');

let commentSchema = new Schema({ 
    content : {
        type : String,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    eventId : {
        type : 'Event',
    },
    date : {
        type : Date,
    },
});

async function commentEvent( eventId, userId, content, cb){
    let commentBody = {
        content : content,
        userId : userId,
        eventId : eventId,
        date : Date.now(),
    };
    try{
        await new Comment(commentBody).save().then((res)=>{
            if(!res) throw new Error('Comment not saved!');
            addComment(res._id , eventId , (data)=>{
                if(data.status === 0) throw new Error(data.message);
                return cb({status : 1, message : 'Comment saved!'});
            });
        }).catch((err)=>{
            throw new Error(err);
        })
    }catch(err){
        return cb({ status : 0, message : err });
    }
}

const Comment = mongoose.model('Comment', commentSchema);
module.exports = {
    Comment,
    commentEvent
}