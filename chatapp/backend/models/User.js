const mongoose  = require('mongoose');
const { Schema }=mongoose;

const Userschema=new Schema({
    email:{type:String,unique:true},
    password:{type:String},
    username:{type:String},
    ProfilePic:{type:String},
    createdAt: {type: Date, default: Date.now}
});

const User=mongoose.model('User',Userschema);

module.exports= User;