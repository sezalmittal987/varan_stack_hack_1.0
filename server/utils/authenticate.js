const admin = require('../firebase/firebase');
const { User } = require('../models/user');

exports.verifyUser = async function (req, res, next) {
    next();
    return;  ///TODO -CHANGE
    try {
        let bearerToken = req.header("Authorization");
        if (bearerToken) {
            bearerToken = (""+bearerToken).split(" ");
            if (bearerToken[0]!=="bearer" && bearerToken[0]!=="Bearer") {
                return res.sendStatus(401);
            }
            admin.auth().verifyIdToken(bearerToken[1])
            .then(function (decodedToken) {
                req._uid = decodedToken.uid;
                User.findOne({ uid  : req._uid, isAdmin : false })
                .then( ()  =>{
                    next();
                }).catch((err)=>{
                    throw new Error(err);
                })
            })
            .catch( () => {
                res.sendStatus(401);
            });
        }
        else {
            console.error("Authorization header not found!");
            return res.sendStatus(401);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
};

exports.verifyAdmin = async function (req, res, next) {
    try {
        let bearerToken = req.header("Authorization");
        if (bearerToken) {
            bearerToken = (""+bearerToken).split(" ");
            if (bearerToken[0]!=="bearer" && bearerToken[0]!=="Bearer") {
                return res.sendStatus(401);
            }
            admin.auth().verifyIdToken(bearerToken[1])
            .then(function (decodedToken) {
                req._uid = decodedToken.uid;
                User.findOne({ uid  : req._uid ,isAdmin : true})
                .then( ()  =>{
                    next();
                }).catch((err)=>{
                    throw new Error(err);
                })
            })
            .catch( () => {
                res.sendStatus(401);
            });
        }
        else {
            console.error("Authorization header not found!");
            return res.sendStatus(401);
        }
    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
};