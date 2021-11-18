const mongoose = require('mongoose')

let url = "mongodb://localhost:27017/test"

mongoose.connect(url)
db.on("error", console.error.bind(console, "mongo connection error"))

module.exports = db