const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const userRoutes = require('./Routes/user/userRoutes.js');
const path = require('path');

const app = express();

const corsOptions = {
  origin: 'http://localhost:4200'
};


// Enable CORS with the specified options
app.use(cors(corsOptions));app.use(express.json());

app.use('/user', userRoutes);


const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

app.get('/', (req,res) => {
    res.json({message: "Success"});
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("🚀 Server successfully running at",PORT);

    else
        console.log("Error occures!!!", error);
});

mongoose.connect(DB_URL)
.then(() => { 
    console.log("✅ Connected to the database!");
    
}).catch((error) => {
    console.error("❌ Connection failed:",error.message)

    
})

//db conenction in terminal: docker exec -it crm-be-mongo-1 mongosh -u root -p secret --authenticationDatabase admin