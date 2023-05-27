const { http_formatter } = require('../middleware/Formatter')
const {StatusCodes} = require('http-status-codes')

const db =require('../models')
const Inv = db.inventories
const Organization = db.orgs
// *  create product

const addInv = async (req, res) => {

    let info =  {
    name:req.body.name,
    organizationId:req.body.organization
} 
  
try {
        const newInv=  await Inv.create(info)
        res.status(StatusCodes.OK).json(http_formatter(newInv,'Created'))
        console.log(newInv)
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in created request',false))
    }
}

// *  get all
// const get = async(req,res)=>{

// try {
//     // const id = req.params.id
    
//     const data = await Inv.findAll({
//         include: "users"
//       });
//     res.status(StatusCodes.OK).json(http_formatter(data,'get succesful'))
// } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in getall request',false))
    
// }

// }
const get = async (req, res) => {
    try {
      const data = await Inv.findAll({
        include: Organization,
        as: 'organization'
      });
      res.status(StatusCodes.OK).json(http_formatter(data, 'Get successful'));
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error, 'Error in getAll re request', false));
    }
  };
  
// * get all innventory

const getAllInv = async (req, res) => {
try {
    let inv = await Inv.findAll()
    res.status(StatusCodes.OK).json(http_formatter(inv,'get succesful'))
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in getall request',false))
}

}

// * get One 

const getOne = async (req,res)=>{
    try {
        let id = req.params.id
        let inv =  await Inv.findOne({where:{id : id}})
        res.status(StatusCodes.OK).json(http_formatter(inv,"get one user"))
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,"error in getone request"))
    }
}

// * update
const updateInv = async (req, res) => {
try {
 
    let id = req.params.id
    const inv = await Inv.update(req.body, { where: { id: id }})
    res.status(StatusCodes.OK).json(http_formatter(inv,'update succesfully'))
} catch (error) {
    
    res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'error in update request ',false))
}

}


// * delete
const deleteInv = async (req, res) => {
    try {
    
        let id = req.params.id
        const inv = await Inv.destroy({ where: { id: id }} )
        res.status(StatusCodes.OK).json(http_formatter(inv,'deleted Success'))
            
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(http_formatter(error,'eror in delete request',false))
        
    }

}
module.exports = {
   getOne,
   getAllInv,
   updateInv,
   deleteInv,
   addInv,
   get  
}