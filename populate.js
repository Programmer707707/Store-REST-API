require('dotenv').config()

//I need this file because we have some data already. That is why I have to add that data to our mongodb collection. 
//that is why I created populate.js

//tayyor datani mongodbga yuborish

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')



const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() // I need to delete if there is something inside the collection
        await Product.create(jsonProducts) // I am sending list of my products
        console.log("Success");
        process.exit(0)
    }
    catch(err){
        console.log(err);
        process.exit(1)
    }
}

start()
