require ('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const alertRoutes = require('./routes/alertRoutes');

//express app
const app = express()

//  app.use(cors( {    //connects frontend and backend
//      origin: 'http://localhost:5173',  // CHANGE LATER 
//      credentials: true // Allow cookies to be sent
// }));  uncomment later when set up frotnend******

//middleware
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/alerts', alertRoutes);



//connect to mongoDb
mongoose.connect(process.env.MONGODB_URL)
    .then((result) => {
        console.log('Connected to Database');
        app.listen(process.env.PORT);
    })
    .catch((err) => {
        console.log('Error at connecting database' + err)
    })