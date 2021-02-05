import express from 'express';
const blogRouter = express.Router();
const companyName = 'AndoTrade';
import Blog from '../models/blog.js';

// Get All Blog - HomePage
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        res.render('tradebloghome', { title: 'Members Home', companyName, blogs });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
});

// Create Blog Post Form
blogRouter.get('/create', (req, res) => {
    res.render('create', { title: 'Create Blog', companyName });
});

// Create Blog Post
blogRouter.post('/', async (req, res) => {
    try {
        const blog = await new Blog(req.body);
        blog.save();
        res.redirect('/tradeblog');

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete Request
blogRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            res.json({ message: err.message });
        });
});

// Get One Blog Post
blogRouter.get('/:id', (req, res) => { 
    const id = req.params.id;
    Blog.findById(id)
        .then(blog => {
            res.render('details', { title: 'Blog Details', companyName, blog });
        })
        .catch(err => {
        
            res.status(400).json({ message: err.message });
        });
});

export default blogRouter;