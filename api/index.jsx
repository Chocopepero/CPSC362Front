const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
app.use(express.json)

// might need ot change the origin
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173/', 

}));

//this is for the data base 
//mogoldb 57:46

mongoose.connect('process.env.MONGO_URL')





app.get('/test', (req,res) => {
    res.json('test ok');
});


app.post('/register', (req,res) => {

    const {name, email, password} = req.body;
    res.json({name,email,password});
})

app.listen(4000);

//45:25 having issue getting connect to nodemon

// had to use nodes