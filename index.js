const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const { initializeDatabase } = require("./db/db.connect")
const cookieParser = require ("cookie-parser")
const todoRoute = require("./routes/todo.route")
const userRoute = require ("./routes/user.route")

// middleware         

const corsOptions = {
  origin: "*",     // this allows request from any origin
  credentials: true,                   // this allows cookies, authorization headers, TLS certi..
  optionSuccessStatus: 200,           // set status code 200 for successful request..
}
const app = express()
app.use(cookieParser())
app.use(express.json())  // middleware who parse incoming request with JSON format like "key": "value" pair

app.use(cors(corsOptions))
         
initializeDatabase() // call the db

// routes

app.use("/api/v1/todo", todoRoute)
app.use("/api/v1/user", userRoute)

app.get("/", (req, res) => {
  res.send("Hello server!!")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
  
})
