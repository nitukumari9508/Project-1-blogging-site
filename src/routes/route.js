const express = require("express")
const router = express.Router()
const authorControllers = require("../Controllers/AuthorController")
const BlogControllers = require("../Controllers/BlogController")


router.get("/test-me", function (req,res){
    res.send("Hii")
})
router.post("/authors",authorControllers.authors)

router.post("/blogs",BlogControllers.createBlog)

module.exports = router