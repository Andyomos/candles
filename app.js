import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import blogRouter from './routes/blogs.js';
import morgan from 'morgan';
import { homePage, aboutPage, contactPage, loginPage, registerPage, errorPage, registerMember, contactUs } from './controllers/app.js';


// Initialise app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Initialise Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


// app.use(passport.initialize());
// app.use(passport.session());
app.use('/tradeblog', blogRouter);



// App Route Ref: app controllers
// Home Page
app.get('/', homePage);
// About Us Routes
app.get('/about', aboutPage);
// Contact Routes
app.get('/contact', contactPage);
// Post Contact Routes
app.post('/contact', contactUs);

// Login Routes
app.get('/login', loginPage);
// Post Login Routes



// Form Register Routes
app.get('/register', registerPage);
// Post Register Routes
app.post('/register', registerMember);

// Handle 404 Routes
app.use(errorPage);

export default app;