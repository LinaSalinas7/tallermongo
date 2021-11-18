const mongoose = require("mongoose")

const titleSchema = new mongoose.Schema({
    title:{type: String, require: true},
    comentario:{type:String, require: true}
})

module.exports=mongoose.model('Title', titleSchema)