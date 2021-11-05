const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subscriptionSchema = new Schema({ 
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    }
});

async function addSubscription(userId , cb){
    try { 
        await new Subscription({userId : userId}).save().then((data) =>{
            return cb({status : 1 , message : 'Subscribed!'});
        }).catch((err) => {throw new Error(err)});
    }catch(err){
        return cb({status : 0 , message: err});
    }
}   

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = {
    Subscription,
    addSubscription
}