const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({ 
    uid : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    events : [{
        type : Schema.Types.ObjectId,
        ref : "Event",
    }],
    image : {
        type : String,
        default : "https://mynotarybucket1.s3.us-east-2.amazonaws.com/default/images/161743577905020619.png",
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {
    Admin,
}