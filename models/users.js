const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id:{type: Number, required: true},
    name: {type: String, require: true},
    username:{type: String, require: true, min:8},
    identification:{type: Number, require: true},
    password:{type: String, require: true},
    photo:{type: String},
    active:{type: Boolean},
    titulo:{titulo:{}, comentario:{}},
    token:{type: String}
})

module.exports = mongoose.model('User', userSchema)