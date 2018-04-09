
//Importing Module
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected', () => {
    console.log("connectes to database @ 27017")
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log("Error in database connection is:" + err);
    }
});


//on connection error
//home page route  
const route = require('./routes/route');

//assign vairable to express instance
var app = express();

//define port number
const port = 3001;

//Adding middleware
app.use(cors());
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, 'public')));


//Important route to contact functions
app.use('/api', route);


//testng server
app.get('/', (req, res) => {
    res.send("foobar");
})

app.listen(port, () => {
    console.log("server started at port number 3001")
})