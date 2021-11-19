const debug = require('debug')('productscrud:user')
const bcrypt = require('bcrypt')
const users = require('../models/users')
const jwt = require('jsonwebtoken');

const User = require('../models/users')

exports.create = async(req, res, next) => {
    

    const userExist = await User.findOne({_id: req.body.id})

    if (userExist){
        return res.status("409").send("user already exist")
    }

    let encryptedPassword = await bcrypt.hash(req.body.password, 10)

    let user = new User ({
        name: req.body.name,
        username: req.body.username,
        identification: req.body.identification,
        password: encryptedPassword,
        photo: req.body.photo,
        active: req.body.active   

    })

    user.save(err=>{
        if(err)
        return next(err)
        res.send("user registeres successfully")
    })
}

exports.index = (req, res, next)=>{
    User.find({}, (err, users)=>{
        if(err)
        return next(err)
        res.send(users)
    })
}

exports.show = (req, res, next)=>{
    User.findById(req.params.id)
    .then(user => {
        if(user._id == null){
            res.status(404).send({error: "user not found"})
        }else{
            res.json(user)
        }
    })
    .catch(error => {
        debug(error)
        res.status(500).send({error: error.message})
    })
}

exports.update = (req, res, next)=>{

    var upUser = User.findOne({id:req.params.id})
    var upName = upUser.name
    var upUsername = upUser.username
    var upIden = upUser.identification
    var uppass = upUser.password
    var upPhoto = upUser.photo
    var upAct = upUser.active

    if(req.body.name != null){
        upName = req.body.name
    }

    if(req.body.username != null){
        upUsername = req.body.username
    }

    if(req.body.identification != null){
        upIden = req.body.identification
    }

    if(req.body.password != null){
        //uppass = await bcrypt.hash(req.body.password, 10)
        uppass = req.body.password
    }


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
}

exports.login = async (req, res, next)=>{
    const {username, password} = req.body

    if(!username || !password){
        res.status(400).send("Username and password are required")
    }

    const user = await User.findOne({username})

    if(user){
        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({user_id: user._id, username}, "llavetoken", {expiresIn:"2d"})
            user.token= token;
            res.status(200).json(user)
        }
        else{
            res.status(400).send("Invalid Credentials")
        }
    }
}