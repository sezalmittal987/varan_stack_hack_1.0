const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let { addCreatedEvent, deleteCreatedEvent } = require('./user');

let eventSchema = new Schema({ 
    title: {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    image : {
        type : String,
        default : "https://www.ntu.ac.uk/__data/assets/image/0020/271820/Default-event.jpg",
    },
    date : {
        type : String,
    },
    location : {
        name : String,
        lat : String,
        lng : String,
    },
    duration : {
        type : Number, // in hours
        default : 0,
    },
    users : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
    }],
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment',
    }],
    group : {
        type : Number,
        default : 0,
    } ,
    corporate : {
        type : Number,
        default : 0,
    },
    other : {
        type : Number,
        default : 0,
    },
    self : {
        type : Number,
        default : 0,
    },
    numberOfTickets : {
        type : Number,
    },
    averageRating : {
        type : Double,
    },
    ratings : [{
        type : Schema.Types.ObjectId,
        ref : 'Rating',
    }],
    isActive : {
        type : Boolean,
        default : true,
    },
    covidFree : {
        type : Boolean,
        default : false,
    },
    registeredBy : {
        type :Schema.Types.ObjectId,
        ref : 'User',
    }
});

async function addEvent( eventBody, cb ) {
    try{
        await new Event(eventBody).save.then((event) =>{
            addCreatedEvent(event._id, eventBody.registeredBy, (res)=>{
                if(res.status === 0) throw new Error(res.message || 'Event not added to the user!');
                return cb({status : 1 , message : 'Event Saved!', event : event });
            })
        }).catch((err)=>{
            throw new Error(err || 'Event not registered!');
        })
    }catch(err){
        return cb({status : 0 , message : err});
    }
}

async function editEvent( eventId , newBody, cb ){
    try {
        Event.findOne({ _id : eventId } , newBody).exec((err, res)=>{
            if(err || !res) throw new Error(err || 'Event not found!');
            return cb ({status : 1, message : 'Event has been updated!'});
        })
    }catch(err){
        return cb({status : 0 , message : err});
    }
}

async function deleteEvent(eventId, userId, cb){
    try {
        Event.findOneAndRemove({_id : eventId}).exec((err , res)=>{
            if(err || !res) throw new Error(err || 'Event has not been deleted!');
            deleteCreatedEvent(userId, eventId, (resp) =>{
                if(resp.status === 0) throw new Error(resp.message);
                return cb({status : 1 , message : 'Event has been deleted!'});
            })
        })
    }catch(err){
        return cb({status : 0, message : err});
    }
}

async function showCreatedEvents(userId, limit, pageNumber , cb){
    try{
        Event.find({ registeredBy : userId }).sort({ "$natural": -1 }).skip(limit*pageNumber).limit(limit).exec((err, res) =>{
            if(!res || err ) throw new Error(err || 'No output!');
            return cb({status : 1, events  : res});
        })
    }catch(err){
        return cb({status : 1, message : err});
    }
}

async function showEvents( pageNumber, limit ){
    try{
        Event.find({}).sort({ "$natural": -1 }).skip(limit*pageNumber).limit(limit).exec((err, res) =>{
            if(!res || err ) throw new Error(err || 'No output!');
            return cb({status : 1, events  : res});
        })
    }catch(err){
        return cb({status : 1, message : err});
    }
}

async function addComment( commentId, eventId, cb ){
    try{
        Event.findOneAndUpdate({_id : eventId} , { $push : { comments : commentId }}).exec((err, res) => {
            if(err || !res) throw new Error(err || 'Event not found!');
            return cb({status : 1 , message : 'Comment Added!'});
        })
    }catch(err){
        return cb({status : 0, message : err});
    }
}

async function addRating(eventId, ratingId, ratingCount, rate, cb){
    try{
        Event.findOne({_id : eventId }).exec((err, res)=>{
            if(err || !res) throw new Error(err || 'Event not found!');
            let newRating = parseFloat(res.averageRating*(ratingCount - 1) + rate ) / parseFloat(ratingCount) ;
            Event.findOneAndUpdate({_id : eventId} , {$set : {averageRating : newRating } , $push : { ratings : ratingId}}).exec((err2 , res2)=>{
                if(err2 ||!res2) return cb({status : 0, message : err2 || 'Event not found!' });
                return cb({status : 1 , message : 'rating updated succesfully!' });
            })
        })
    }catch(err){
        return cb({status : 0, message : err });
    }
}

async function updateEvent(eventId, noOfTickets, registrationType, increase, cb){
    let query;
    if(registrationType === 'self') query = {$inc : {numberOfTickets : noOfTickets , self : increase}};
    if(registrationType === 'other') query = {$inc : {numberOfTickets : noOfTickets , other : increase}};
    if(registrationType === 'corporate') query = {$inc : {numberOfTickets : noOfTickets , corporate : increase}};
    if(registrationType === 'group') query = {$inc : {numberOfTickets : noOfTickets , group : increase}};
    try { 
        Event.findOneAndUpdate({_id : eventId} , query).exec((err, res) => {
            if(err || !res) throw new Error(err || 'Event not found!');
            return cb({ status : 1, message : 'Event updated successfully!'});
        })
    }catch(err){
        return cb({ status : 0, message: err });
    }
}

const Event = mongoose.model('Event', eventSchema);
module.exports = {
    Event,
    addEvent,
    editEvent,
    deleteEvent,
    showEvents,
    addComment,
    addRating,
    showCreatedEvents,
    updateEvent
}