const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
    name: {type: String, require: true},
    username:{type: String, require: true, min:8},
    identification:{type: Number, require: true},
    password:{type: String, require: true},
    photo:{type: String},
    active:{type: Boolean},
    token:{type: String}
})

module.exports = mongoose.model('User', userSchema) 