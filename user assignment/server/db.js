const mongoose=require('mongoose')
const env=require('dotenv').config()

const db=mongoose.connect(process.env.mongourl)

  module.exports={db}