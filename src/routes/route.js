const express = require("express")
const router = express.Router()
const authorControllers = require("../Controllers/AuthorController")
const BlogControllers = require("../Controllers/BlogController")
const{ authentication , authorization } = require("../Middlewares/commonMiddleware")

// API to create new author

router.post("/authors", authorControllers.authors)

// API for Author Login

router.post("/login", authorControllers.authorLogin)

// API to create new blog

router.post("/blogs", authentication , authorization , BlogControllers.createBlog)

// API to find blogs

router.get("/blogs", authentication , BlogControllers.getBlogs)

// API to update blogs

router.put("/blogs/:blogId", authentication , authorization , BlogControllers.updateBlogs)

// API to delete blogs with path params

router.delete("/blogs/:blogId", authentication , authorization , BlogControllers.deleteBlog)

// API to delete blogs with query params

router.delete("/blogs", authentication , BlogControllers.deBlogsQ)

module.exports = router