const mongoose = require('mongoose')


let url = process.env.MONGO_URI

mongoose.connect(url)
let db = mongoose.connection

db.on("error", console.error.bind(console, "mongo connection error"))

module.exports = db