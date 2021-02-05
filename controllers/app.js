import Member from '../models/app.js';
import Message from '../models/message.js';
const companyName = 'AndoTrade';
import bcrypt from 'bcrypt';




// Home Page
export const homePage = (req, res) => {
    res.render('index', { title: 'Home', companyName });
}

// About Us Routes
export const aboutPage = (req, res) => {
    res.render('about', {title: 'About', companyName});
}

// Contact Routes
export const contactPage = (req, res) => {
    res.render('contact', {title: 'Contact', companyName});
}

// Post Contact Routes
export const contactUs = async (req, res) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try {
        await message.save();
        res.status(201).redirect('/contact');  
    } catch (err) {
        res.status(400).json({message: err.message});
    } 
}

// Form Register Routes
export const registerPage = (req, res) => {   
    res.render('register', { title: 'Register', companyName });  
}

// Post Register Routes
export const registerMember = async (req, res) => {
   try {
       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       console.log(salt);
       console.log(hashedPassword);

       const member = new Member({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        
    });  
        try {
            await member.save();
            res.status(201).redirect('/login');  
        } catch (err) {
            res.status(400).json({message: err.message});
        }
   } catch (error) {
       res.status(400).json({message: err.message});
   }
}


// Login Routes
export const loginPage = (req, res) => {
    res.render('login', {title: 'Login', companyName});
}

// Post Login Routes
export const loginMember = async (req, res) => {
  const member = req.body.email;
    Member.find({member})    
        .then(() => {
            if(bcrypt.compare(req.body.password, member.password)){
                res.redirect('/tradeblog');
        } else {
            res.redirect('/register');
       }
            
        })
        .catch(err => {
        
            res.status(400).json({ message: err.message });
        });
    
}

// Handle 404 Routes
export const errorPage = (req, res) => {
    res.status(404).render('404', {title: 'Error', companyName});
}

    