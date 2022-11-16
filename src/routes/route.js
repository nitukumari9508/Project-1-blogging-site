const express = require("express")
const router = express.Router()
const authorControllers = require("../Controllers/AuthorController")
const BlogControllers = require("../Controllers/BlogController")
const LoginControllers = require("../Controllers/LoginController")
const commonMW = require("../Middlewares/commonMiddleware")

// API to create new author

router.post("/authors",authorControllers.authors)

// API for Author Login

router.post("/login", LoginControllers.authorLogin)

// API to create new blog

router.post("/blogs", commonMW.authentication , commonMW.authorization , BlogControllers.createBlog)

// API to find blogs

router.get("/getBlogs", commonMW.authentication , BlogControllers.getBlogs)

// API to update blogs

router.put("/blogs/:blogId", commonMW.authentication , commonMW.authorization , BlogControllers.updateBlogs)

// API to delete blogs with path params

router.delete("/blogs/:blogId", commonMW.authentication , commonMW.authorization , BlogControllers.deleteBlog)

// API to delete blogs with query params

router.delete("/blogs", commonMW.authentication , BlogControllers.deBlogsQ)

module.exports = router