require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 5000;

//Data

//Configuration
app.set('view engine', 'jsx')
app.engine('jsx', require('jsx-view-engine').createEngine())

//Middleware
app.use((req, res, next) => {
    // console.log(req.body);
    console.log('I run for all the routes')
    next();
    //? next() - ensures that the request continues to be processed and that you get a response
})

app.use(express.urlencoded({extended: false}))

//Routes
//! Home Page
app.get('/', (req, res) => {
    res.send('<h1>Veggie Stand</h1>')
})

//! Index - get veggies list
app.get('/veggies', (req, res) => {
    res.send('list')
})

//! Post - add new veggie
app.post('/veggies/new', (req, res) => {
    res.send('post')
})

//! Show - show each veggie
app.get('/veggies/:id', (req, res) => {
    res.send('veggie')
})





//! Not Found
app.get('*', (req, res) => {
    //* send them to 404 page
    res.send('404')
   
})


app.listen(port, (req, res) => {
    console.log('Listening on port' + port);
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!');
})
})