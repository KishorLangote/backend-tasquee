const express = require("express")

const { createTodo,
         deleteTodo,
         getTodos,
         updateTodo
     } = require("../controllers/todo.controller")
const authenticate = require("../middleware/authorize")

const router = express.Router()

router.post("/create", authenticate, createTodo)
router.get("/fetch", authenticate, getTodos)
router.put("/update/:id", authenticate, updateTodo)
router.delete("/delete/:id", authenticate, deleteTodo)

module.exports = router