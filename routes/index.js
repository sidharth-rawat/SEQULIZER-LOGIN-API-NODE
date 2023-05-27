const express = require('express')
const allRouter = express.Router() 
const user = require('./user.Router')
const org = require('./org.router')
const auth =require('../middleware/authenticate')
const inv = require('./inv.routers')

allRouter.use('/user',user)
allRouter.use('/org',auth,org)
allRouter.use('/inv',auth,inv)

module.exports = allRouter;

