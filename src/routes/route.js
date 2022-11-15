const express = require("express")
const router = express.Router()
const authorControllers = require("../Controllers/AuthorController")
const BlogControllers = require("../Controllers/BlogController")

// API to create new author

router.post("/authors",authorControllers.authors)

// API to create new blog

router.post("/blogs",BlogControllers.createBlog)

// API to find blogs

router.get("/getBlogs",BlogControllers.getBlogs)

// API to update blogs

router.put("/updateBlogs/:blogId",BlogControllers.updateBlogs)

// API to delete blogs

router.delete("/blogs/:blogId",BlogControllers.deleteBlog)

router.delete("/blogs",BlogControllers.deBlogsQ)

module.exports = router