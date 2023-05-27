const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes')
const Logger = require('../middleware/logger');
const auth = (req, res, next) => {
    console.log(req.headers)
    try{

        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        if(!token){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid Token"});
        }
        const user = jwt.verify(token, 'SECRET_KEY');
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"You are Unauthorized"});
        }
        next();
    }
    catch (error) {
        Logger.error(error);
        res.status(StatusCodes.UNAUTHORIZED).json({message:"You are Unauthorized"});
    }
}

module.exports = auth;

// use case 
// if we want to use a function or a check multiple time.
// we tend to use middlewares