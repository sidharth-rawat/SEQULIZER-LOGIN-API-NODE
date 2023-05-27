const express = require('express')
const cors = require('cors')
const {http_formatter} = require('./middleware/Formatter');
const { StatusCodes } = require('http-status-codes');
const Logger = require('./middleware/logger')
const app = express()


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => res.json({ 'message': 'server is running' }));

// routers
const allRouter = require('./routes')
app.use('/api', allRouter)




app.use((req, res, next) => {
    const error = new Error('Invalid request');
    res.status ( StatusCodes.NOT_FOUND); // not found.
    next(error);
  });
  
  // this is the last route that will get hit, if there's no matching route or some error has occurred.
  app.use((error, req, res, next) => {
    res.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.json(
        http_formatter(error, error.message, false)
    );
  })

//port

const PORT = process.env.PORT || 7000

//server

app.listen(PORT, async () => {
    Logger.info(`server is running on port ${PORT}`)
  
})