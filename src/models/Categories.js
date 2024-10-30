const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Categories: {
        type: Array,
        trim: true,
    },
    active: {
        type: String,
        trim: true,
    },
   
}, { collection: 'Categories', timestamps: true });

const Admin = mongoose.model('Categories', UserSchema);

module.exports = Admin;