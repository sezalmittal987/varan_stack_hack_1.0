const express = require('express');
const { verifyUser } = require('../utils/authenticate');

const { User } = require('../models/user');
const { Event, addEvent, deleteEvent, editEvent, showEvents, showCreatedEvents} = require('../models/event');
const { showRegisteredEvents, registerUserForEvent, deleteRegistrationForUser } = require('../models/registeration');
const { rateEvent } = require('../models/rating');
const { commentEvent } = require('../models/comment');
const { addSubscription } = require('../models/subscription');
const { friendUser } = require('../models/friend');

let router = express.Router();  

router.post('/login' , async(req,res)=>{
    let { email, password } = req.body || {} ;
    try{
        await User.findOne({ email : email, password : password }, 'uid name isAdmin email image isVaccinated ', (err , user)=>{
            if(err) throw new Error("User doesn't exist!");
            return res.status(200).send({status : 1, user: user, message : "User logged in successfully"});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err});
    }
})

router.post('/register' , async(req, res)=>{
    let { uid, name, email, password, image, isVaccinated, vaccinationCertificate } = req.body || {};
    let userBody = {
        uid : uid, 
        name : name, 
        email : email, 
        password : password, 
        image : image, 
        isVaccinated : isVaccinated, 
        vaccinationCertificate : vaccinationCertificate,
    };
    try{
        await new User(userBody).save().then((user)=>{
            if(!user) throw new Error("User could not be saved!");
            return res.status(200).send({status : 1 , message : 'User registered successfully!'}) ;
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err});
    }
})
// 
router.post('/addEvent' ,  async(req, res) =>{
    let { userId, title, description, image, date, location, duration, covidFree  } = req.body || {};
    let eventBody = {
        title : title,
        description : description,
        image : image,
        date : date,
        location : location,
        duration : duration,
        covidFree : covidFree,
        registeredBy : userId
    }
    try{
        await addEvent(eventBody , (data) =>{
            if(data.status === 0) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/deleteEvent',  async(req, res ) => {
    let { eventId, userId } = req.body || {} ;
    try{
        await deleteEvent(eventId , userId , (data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/editEvent',  async(req, res ) => {
    let { eventId , title, description, image, date, location, duration, covidFree  } = req.body || {};
    let eventBody = {
        title : title,
        description : description,
        image : image,
        date : date,
        location : location,
        duration : duration,
        covidFree : covidFree,
    }
    try{
        await editEvent(eventId , eventBody, (data) => {
            if(data.status === 0) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/showRegisteredEvents',  async(req, res ) => {
    let { userId, limit, pageNumber } = req.body || {} ;
    try{
        await showRegisteredEvents( userId , limit , pageNumber,  (data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , events : data.events});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/showCreatedEvents' ,  async(req, res ) => {
    let { userId, limit, pageNumber } = req.body || {} ;
    try{
        await showCreatedEvents( userId , limit , pageNumber,  (data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , events : data.events});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})
// 
router.post('/showEvents' ,  async(req, res ) => {
    let {limit, pageNumber } = req.body || {} ;
    try{
        await showEvents( pageNumber, limit, (data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , events : data.events});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/rateEvent',  async(req, res ) => {
    let { eventId, userId, rate} = req.body || {} ;
    try{
        await rateEvent( eventId, userId , rate,  ( data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/commentEvent',  async(req, res ) => {
    let { eventId, userId, content} = req.body || {} ;
    try{
        await commentEvent( eventId, userId , content,  ( data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/subscribe',  async(req, res ) => {
    let { userId } = req.body || {} ;
    try{
        await addSubscription( userId,  ( data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/friend',  async(req, res ) => {
    let { user1 , user2 } = req.body || {} ;
    try{
        await friendUser ( user1, user2,  ( data ) => {
            if(data.status === 0 ) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})
// 
router.post('/event/:id' ,  async(req, res) =>{
    let eventId = req.params.id;
    // console.log(eventId);
    try{
        Event.findOne({ _id : eventId })
        .populate({path : 'comments', populate : { path : 'userId' , select : 'name' }})
        .populate({ path : 'users', select : 'name email _id' })
        .exec((err, resP)=>{
            if(err || !resP)  return res.status(500).send({ status : 0 , message : err  || 'Event not found!'}) ;
            return res.status(200).send({ status : 1 , event : resP });
        })
    }catch(err){
        return res.status(500).send({ status : 0 , message : err }) ;
    }
})

router.post('/chart/:id' ,  async(req, res) =>{
    let eventId = req.params.id;
    try{
        Event.findOne({ _id : eventId } , 'group corporate others self').exec((err, resP)=>{
            if(err || !resP) throw new Error(err || 'Event not found!');
            return res.status(200).send({status : 1 , event : resP });
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/registerForEvent' ,  async(req, res) =>{
    let { userId, eventId , registrationType, noOfTickets, phoneNumber } = req.body || {};
    try{
        await registerUserForEvent(userId, eventId , registrationType, noOfTickets, phoneNumber , (data) =>{
            if(data.status === 0) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

router.post('/deleteRegistration' ,  async(req, res) => {
    let { userId, eventId } = req.body || {};
    try{
        await deleteRegistrationForUser(userId, eventId , (data) =>{
            if(data.status === 0) throw new Error(data.message);
            return res.status(200).send({status : 1 , message : data.message});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err}) ;
    }
})

module.exports = router;
