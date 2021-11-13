const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({ 
    uid : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    email : {
        type : String,
        requried : true,
    },
    password : {
        type : String,
        required : true,
    },
    registeredEvents : [{
        type : Schema.Types.ObjectId,
        ref : "Register",
    }],
    image : {
        type : String,
        default : "https://mynotarybucket1.s3.us-east-2.amazonaws.com/default/images/161743577905020619.png",
    },
    createdEvents : [{
        type : Schema.Types.ObjectId,
        ref : "Event",
    }],
    isVaccinated : {
        type : Boolean,
    },
    vaccinationCertificate : {
        type : String,
    },
});

async function addCreatedEvent(eventId , userId , cb){
    try{
        User.findOneAndUpdate({_id : userId} , { $push : { createdEvents : { eventId } } } ).exec((err, res)=>{
            if(err || !res) throw new Error(err || 'User not found!');
            return cb ({status : 1 , message : 'Event added to user\'s events'});
        })
    }catch(err){
        return cb({status : 0 , message : err });
    }
}

async function deleteCreatedEvent(userId, eventId, cb){
    try{
        User.findOneAndUpdate({_id : userId} , { $pull : { createdEvents : { eventId }}}).exec((err, res)=>{
            if(err || !res ) throw new Error(err || 'Event not deleted!');
            return cb({status : 1 , message : 'Event deleted successfully!'});
        })
    }catch(err){
        return cb({status : 0 , message : err });
    }
}

async function addRegisteredEvent( userId, registerId, cb ){
    try{
        User.findOneAndUpdate({_id : userId} , { $push : { registeredEvents : { registerId } } } ).exec((err, res)=>{
            if(err || !res) throw new Error(err || 'User not found!');
            return cb ({status : 1 , message : 'Event added to user\'s registered events'});
        })
    }catch(err){
        return cb({status : 0 , message : err });
    }
}

async function deleteRegistration( userId, registerId ,cb){
    try{
        User.findOneAndUpdate({_id : userId} , { $pull : { createdEvents : { registerId  }}}).exec((err, res)=>{
            if(err || !res) throw new Error(err || 'Event not removed!');
            return cb({status : 1 , message : 'Event deleted successfully!'});
        })
    }catch(err){
        return cb({status : 0 , message : err });
    }
}

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    addCreatedEvent,
    deleteCreatedEvent,
    addRegisteredEvent,
    deleteRegistration,
} 