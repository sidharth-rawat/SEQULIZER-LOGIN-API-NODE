const {
    http_formatter
} = require('../middleware/Formatter')
const {
    StatusCodes
} = require('http-status-codes')
const db = require('../models')
const bcrypt = require('bcrypt');
const User = db.users
const jwt= require("jsonwebtoken");
const Logger  = require('../middleware/logger');
const { error } = require('console');


// *  create product

// const addUser = async (req, res) => {
//     try {
//         // const existingUser = await User.findOne({ where: { email:req.body.email } });
//         // if (existingUser) {
//         //   return res
//         //     .status(StatusCodes.BAD_REQUEST)
//         //     .json(http_formatter(null, 'User already exists', false));
//         // }
          
//       let info = {
//         firstname: req.body.firstname,
//         middlename: req.body.middlename,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password
//       };
  
//       const saltRounds = 10;
  
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(info.password, saltRounds);
//       info.password = hashedPassword;
  
//       const users = await User.create(info);
//       res.status(StatusCodes.OK).json(http_formatter(users, 'Created'));
//       console.log(users);
//     } catch (error) {
//         console.log(error);
//       res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, 'Error in create request', false));
//     }
// };

const addUser = async (req, res) => {
    // validate the data being recieved from client.
    /**
     * 1. client level validation
     * 2. controller level validation
     * 3. db level validation.
    */
   // hash the password.
   // change the password to hashed one.
   
    const oldPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const securePassword = await bcrypt.hash(oldPassword, salt);
    req.body.password = securePassword;

    const _userBody = req.body;
    // enter your own validation.
    
    const _user = new User(_userBody)
    return _user.save().then(result => {
        // it will get executed only when the DB query is successful.
        delete _userBody["password"]
        const token = jwt.sign(_userBody, 'SECRET_KEY');
    Logger.info(token)
        res.status(StatusCodes.OK).json({data: result, token:token})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}
  
// *  get all
const getAllUser = async (req, res) => {
    try {
        let products = await User.findAll()
        res.status(StatusCodes.OK).json(http_formatter(products, 'get succesful'))
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, 'error in getall request', false))
    }

}

// * get One 

const getOne = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findOne({
            where: {
                id: id
            }
        })
        res.status(StatusCodes.OK).json(http_formatter(user, "get one user"))
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, "error in getone request"))
    }
}

// * update
const updateUser = async (req, res) => {
    try {

        let id = req.params.id
        const user = await User.update(req.body, {
            where: {
                id: id
            }
        })
        res.status(StatusCodes.OK).json(http_formatter(user, 'update succesfully'))
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, 'error in update request ', false))
    }

}


// * delete
const deleteUser = async (req, res) => {
    try {

        let id = req.params.id
        const user = await User.destroy({
            where: {
                id: id
            }
        })
        res.status(StatusCodes.OK).json(http_formatter(user, 'deleted Success'))

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, 'eror in delete request', false))

    }

}
const login = async (req, res) => {
    try {
      const {  email,password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(http_formatter(error,"User Not Found!",false) );
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,"User Not Found!",false) );
      }
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY"); // Replace "your-secret-key" with your actual secret key

    //   return res.status(StatusCodes.OK).json({ data: { message: "Successfully Logged In!", token: token } });
      return res.status(StatusCodes.OK).json(http_formatter(token,"Successfully Logged In!"));
    
     } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(http_formatter(error,"User Not Found!",false) );
      ;
    }
  };
  
module.exports = {
    addUser,
    deleteUser,
    getOne,
    getAllUser,
    updateUser,
    login
}