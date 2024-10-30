const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    discord_name: {
        type: String,
        trim: true,
    },
    age:{
        type: String,
        trim: true
    },
    category:{
        type: String,
        trim: true
    },
    information:{
        type: String,
        trim: true
    },
    links:{
        type: String,
        trim: true
    }, 
    User_IP:{
        type: String,
        trim: true
    }, 
    usertoken:{
        type: String,
        trim: true
    }, 
    email:{
        type: String,
        trim: true
    },
    diger:{
        type: String,
        trim: true
    }, 
}, { collection: 'elenenler', timestamps: true });

const Admin = mongoose.model('elenenler', UserSchema);

module.exports = Admin;