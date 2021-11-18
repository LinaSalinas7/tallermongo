const debug = require('debug')('productscrud:title')
const bcrypt = require('bcrypt')
const users = require('../models/users')

const User = require('../models/users')

exports.create = async(req, res, next) => {
    

    const titleExist = await Title.findOne({id: req.body.id})

    let user = new Title ({
        title: req.body.title,
        comentario: req.body.comentario,
    
    })

    user.save(err=>{
        if(err)
        return next(err)
        res.send("title registeres successfully")
    })
}

exports.index = (req, res, next)=>{
    Title.find({}, (err, titles)=>{
        if(err)
        return next(err)
        res.send(titles)
    })
}

exports.show = (req, res, next)=>{
    Title.findById(req.params.id)
    .then(title => {
        if(title == null){
            res.status(404).send({error: "title not found"})
        }else{
            res.jason(title)
        }
    })
    .catch(error => {
        debug(error)
        res.status(500).send({error: error.message})
    })
}

exports.update = (req, res, next)=>{
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, title)=>{
        if(err)
        return next(err)
        res.send("title updated successfully")
    })
}

exports.delete = (req, res, next)=>{
    User.findByIdAndRemove(req.params.id, (err, title)=>{
        if(err)
        return next(err)
        res.send("title deleted sussesfully")
    })
}