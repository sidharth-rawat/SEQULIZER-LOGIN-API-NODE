const { http_formatter } = require('../middleware/Formatter')
const {StatusCodes} = require('http-status-codes')
const Logger = require('../middleware/logger')
const db =require('../models')
const Org = db.orgs

// *  create product

const addOrg = async (req, res) => {

    let info =  {
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    countrycode:req.body.countrycode,
    created_by: req.body.created_by
} 

try {
    const newOrg=  await Org.create(info)
    res.status(StatusCodes.OK).json(http_formatter(newOrg,'Created'))
    Logger.info(newOrg)
    
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in created request',false))
}

}

// *  get all
const getAllOrg = async (req, res) => {
try {
    let org = await Org.findAll()
    res.status(StatusCodes.OK).json(http_formatter(org,'get succesful'))
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in getall request',false))
}

}

// * get One 

const getOne = async (req,res)=>{
    try {
        let id = req.params.id
        let org =  await Org.findOne({where:{id : id}})
        res.status(StatusCodes.OK).json(http_formatter(org,"get one user"))
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,"error in getone request"))
    }
}

// * update
const updateOrg = async (req, res) => {
try {
 
    let id = req.params.id
    const org = await Org.update(req.body, { where: { id: id }})
    res.status(StatusCodes.OK).json(http_formatter(org,'update succesfully'))
} catch (error) {
    
    res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in update request ',false))
}

}


// * delete
const deleteOrg = async (req, res) => {
    try {
    
        let id = req.params.id
        const org = await Org.destroy({ where: { id: id }} )
        res.status(StatusCodes.OK).json(http_formatter(org,'deleted Success'))
            
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'eror in delete request',false))
        
    }

}
module.exports = {
   getOne,
   getAllOrg,
   updateOrg,
   deleteOrg,
   addOrg
   
}