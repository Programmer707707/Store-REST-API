require('dotenv').config()
require('express-async-errors') // this is an async wrapper

const express = require('express')
const notFoundMiddleware =  require('./middleware/not-found');
const ErrorHandlerdMiddleware =  require('./middleware/error-handler');
const app = express()

const connectDB = require('./db/connect');
const router = require('./routes/products')

//middleware
app.use(express.json())



//routes
app.get('/', async (req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Products route</a>')
})

//all routes use the route on the LHS as a base route
app.use('/api/v1/products', router)


//products routes
app.use(notFoundMiddleware);
app.use(ErrorHandlerdMiddleware);

const port = process.env.PORT || 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Connect to DB");
        app.listen(port, console.log(`Server is listening port ${port}`))
    }
    catch(error){
        console.log(error);
    }
}

start()