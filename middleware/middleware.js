const cors = require( "cors");
const bodyParser = require( "body-parser");
const { StatusCodes }  = require ( "http-status-codes");
// const rateLimit = require( "express-rate-limit");
import rateLimit from 'express-rate-limit'


const __middleware = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
     // cors("*")
    // rateLimit({
    //   max: 5,
    //   windowMS: 10000, // 10 seconds
    //   message: "You can't make any more requests at the moment. Try again later"
    //   })
    //   ,    
    (req, res, next) => {
      res.set('Cache-Control', 'no-store, max-age=0')
      next();
    },
    (req, res, next) => {
      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    },
    (error, req, res, next) => {
      if (error.type == 'time-out') return res.status(StatusCodes.REQUEST_TIMEOUT).json(error)
      else return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      })
    }
];

export default __middleware;