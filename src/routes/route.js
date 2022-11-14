const express = require("express")
const router = express.Router()
const authorControllers = require("../Controllers/AuthorController")


router.get("/test-me", function (req,res){
    res.send("Hii")
})
router.post("/authors",authorControllers.authors)
module.exports = router