import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { 
        http.createServer(app).listen(PORT, (err) => {
        if (err) console.log(err);
        else {
            console.log(`Listening on port ${PORT}`);
            console.log('Connected to DB server');
        }
        });
    })
    .catch((err) => console.log(err));


