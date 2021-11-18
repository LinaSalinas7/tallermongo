const debug = require('debug')('productscrud:user')
const bcrypt = require('bcrypt')
const users = require('../models/users')

const User = require('../models/users')

exports.create = async(req, res, next) => {
    

    const userExist = await User.findOne({id: req.body.id})

    if (userExist){
        return res.status("409").send("user already exist")
    }

    let encryptedPassword = await bcrypt.hash(req.body.password, 10)

    let user = new User ({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        identification: req.body.username,
        password: encryptedPassword,


    })

    user.save(err=>{
        if(err)
        return next(err)
        res.send("user registeres successfully")
    })
}

/*exports.index = (req, res, next)=>{
    User.find({}, (err, users)=>{
        if(err)
        return next(err)
        res.send(users)
    })
}

exports.show = (req, res, next)=>{
    User.findById(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).send({error: "user not found"})
        }else{
            res.jason(user)
        }
    })
    .catch(error => {
        debug(error)
        res.status(500).send({error: error.message})
    })
}

exports.update = (req, res, next)=>{
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, user)=>{
        if(err)
        return next(err)
        res.send("user updated successfully")
    })
}

exports.delete = (req, res, next)=>{
    User.findByIdAndRemove(req.params.id, (err, user)=>{
        if(err)
        return next(err)
        res.send("user deleted sussesfully")
    })
}*/