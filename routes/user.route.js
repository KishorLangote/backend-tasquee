const express = require("express")
const { login, logout, register } = require("../controllers/user.controller")

const router = express.Router()

router.post("/signup", register)
router.post("/login", login)
router.get("/logout", logout)

module.exports = router