const express = require('express');
const router = express.Router();
const { verifyRegistar } = require('../Middlewares/VeryfiToken.middleware');
const { blogCreate, blog_update, blog_delete, getBlog, blogSearch, singleBlog } = require('../Controllers/Blog');
const formidable = require('express-formidable');



router.post('/blog-create',verifyRegistar,formidable(),blogCreate);
router.post('/blog-update/:id',verifyRegistar,formidable(),blog_update);
router.delete('/blog-delete/:id',verifyRegistar,blog_delete);
router.get('/Blog/:page',getBlog);
router.get('/blog-search',blogSearch);
router.get('/single-blog/:id',singleBlog);





module.exports = router;