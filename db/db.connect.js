const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


const mongoUrl = process.env.MONGODB

const initializeDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl)
    console.log("Database connected successfully.")
  } catch (error) {
    console.log("Error while connecting database", error)
  }
}

module.exports = { initializeDatabase }