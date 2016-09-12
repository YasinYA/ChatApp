var mongoose = require('mongoose');

var usermsgSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }
});

var userMsg = module.exports = mongoose.model('messages', usermsgSchema);

module.exports.getMessages = function(callback, limit) {
  userMsg.find(callback).limit(limit);
}

module.exports.getUserMessages = function(id, callback) {
  userMsg.find({userId:id}, callback);
}

module.exports.saveMessages = function(msg, callback) {
    userMsg.create(msg, callback);
}