const debug = require('debug')('productscrud:title')
const bcrypt = require('bcrypt')
const titles = require('../models/titles')

const Title = require('../models/titles')

exports.create = async(req, res, next) => {
    

    const titleExist = await Title.findOne({_id: req.body.id})

    let title = new Title ({
        title: req.body.title,
        comentario: req.body.comentario,
    
    })

    title.save(err=>{
        if(err)
        return next(err)
        res.send("title created successfully")
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
            res.json(title)
        }
    })
    .catch(error => {
        debug(error)
        res.status(500).send({error: error.message})
    })
}

exports.update = (req, res, next)=>{
    Title.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, title)=>{
        if(err)
        return next(err)
        res.send("title updated successfully")
    })
}

exports.delete = (req, res, next)=>{
    Title.findByIdAndRemove(req.params.id, (err, title)=>{
        if(err)
        return next(err)
        res.send("title deleted sussesfully")
    })
}