const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let { addRegisteredEvent, deleteRegistration } = require( './user') ;
let registrationSchema = new Schema({ 
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    eventId : {
        type : Schema.Types.ObjectId,
        ref : 'Event',
    },
    date : {
        type: Date,
    },
    registrationType : {
        type : String,
    },
    noOfTickets : {
        type : Number,
        required : true,
    },
    phoneNumber : {
        type : String
    }
});

async function registerUserForEvent(userId, eventId , registrationType, noOfTickets, phoneNumber, cb){
    try{
        await new Register({
            userId : userId , 
            eventId : eventId , 
            date : Date.now(), 
            registrationType : registrationType, 
            noOfTickets : noOfTickets, 
            phoneNumber : phoneNumber
        }).save().then((data)=>{
            if(!data) throw new Error('User Not registered!');
            addRegisteredEvent(userId, data._id,  (res) => {
                if(res.status === 0) throw new Error(res.message);
                updateEvent(eventId, data.noOfTickets, data.registrationType, 1, (res2)=>{
                    if(res2.status === 0) throw new Error(res2.message);
                    return cb({status : 1, message : 'User registered!'});
                } )
            })
        }).catch((err) => {
            throw new Error(err);
        })
    }catch(err){
        return cb ({status : 0 , message : err});
    }
}

async function deleteRegistrationForUser(userId , eventId , cb){
    try {
        Register.findOneAndRemove({userId : userId, eventId : eventId }).exec((err , res)=>{
            if(err || !res) throw new Error(err || 'Event has not been deleted!');
            deleteRegistration(userId, res._id, (resp) =>{
                if(resp.status === 0) throw new Error(resp.message);
                updateEvent(eventId, -res.noOfTickets, res.registrationType, -1, (res2)=>{
                    if(res2.status === 0) throw new Error(res2.message);
                    return cb({status : 1 , message : 'Event has been deleted!'});
                } )
            })
        })
    }catch(err){
        return cb({status : 0, message : err});
    }
}

async function showRegisteredEvents( userId, limit, pageNumber, cb ){
    try{
        Register.find({ userId : userId }).sort({ "$natural": -1 }).skip(limit*pageNumber).limit(limit).exec((err, res) =>{
            if(!res || err ) throw new Error(err || 'No output!');
            return cb({status : 1, events  : res});
        })
    }catch(err){
        return cb({status : 1, message : err});
    }
}

const Register = mongoose.model('Register', registrationSchema);
module.exports = {
    Register,
    registerUserForEvent,
    deleteRegistrationForUser,
    showRegisteredEvents
}