var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    role: String,
    active: Boolean,
    lastLogin: Date
});

module.exports = mongoose.model('User', UserSchema);