const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let friendSchema = new Schema({ 
    user1 : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    user2 : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});

async function friendUser( user1 , user2 ){
    try{
        await new Friend({user1 : user1 , user2 : user2 })
        .save().then((data)=>{
            if(!data) throw new Error('User could not be friended!');
            return cb({status : 1, message : 'User friended!'});
        }).catch((err) => {
            throw new Error(err);
        })
    }catch(err){
        return cb ({status : 0 , message : err});
    }
}

const Friend = mongoose.model('Friend', friendSchema);
module.exports = {
    Friend,
    friendUser,
}