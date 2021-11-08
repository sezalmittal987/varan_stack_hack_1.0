const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let { addRating } = require('./event');

let ratingSchema = new Schema({ 
    eventId : {
        type : Schema.Types.ObjectId,
        ref : 'Event',
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User' 
    },
    rate : {
        type : Number, //1 to 5
    },
    date : {
        type : Date,
    }
});

async function rateEvent(eventId, userId, rate , cb){
    let ratingEvent = {
        eventId : eventId,
        userId : userId,
        rate : rate,
        date : Date.now(),
    };
    try{
        await new Rating(ratingEvent).save().then((data) => {
            if(!data) throw new Error('Rating not updated!');
            let ratingCount = Rating.countDocuments({eventId : eventId}).then().catch(err=>{throw new Error(err)});
            addRating(eventId, data._id, ratingCount, rate, (resp)=>{
                if(!resp || resp.status === 0) throw new Error()
                return cb({ status : 1, message : 'Rating added!' });
            } );
        }).catch((err) =>{
            throw new Error(err);
        })
    }catch(err){
        return cb({status : 0 , message : err });
    }
}

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = {
    Rating,
    rateEvent
}