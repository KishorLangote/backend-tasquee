const Todo = require("../models/todo.model")
const User = require("../models/user.model")

// create todo

 const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id, // id's of todo with logged in user
  })

  try {
    const newTodo = await todo.save()
    res.status(201).json({ message: "Todo Created Successfully", newTodo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error while todo creation"})
  }
}


// get todos

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }) // fetch todos only for logged in user..
    res.status(201).json({ message: "Todo Fetched Successfully", todos })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error while todo creation"})
  }
}

// update todos

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
     res.status(201).json({ message: "Todo updated Successfully", todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error while todo updating"})
  }
}



// delete todo

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if(!todo){
      res.status(404).json({ message: "Todo not found"})
    }
    res.status(201).json({ message: "Todo deleted Successfully", todo })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error while todo updating"})
  }
}


module.exports = { createTodo, getTodos, deleteTodo, updateTodo }