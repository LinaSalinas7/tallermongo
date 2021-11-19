const jwt = require("jsonwebtoken")

const veryfytoken = (req, res, next)=>{
    let token = req.body.token || req.headers.authorization

    if(!token)
        return res.status(403).send("Forbidden")
    try{
        token=token.substring(token, "tokensecret")
        console.log(token)
        const decoded = jwt.verify(token, "llavetoken")
        req.user = decoded
    }catch (err){
        return res.status(403).send("Invalid token")

    }


    return next()
}

module.exports = veryfytoken