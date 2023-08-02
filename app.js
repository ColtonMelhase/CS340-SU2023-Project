// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();           // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 22221;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
app.get('/', function(req, res)
    {  

        res.render('index');                  // Render the index.hbs file, and also send the renderer
                                                             // an object where 'data' is equal to the 'rows' we
    });                                           // requesting the web site.

app.get('/customers.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

app.get('/orders.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Orders;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('orders', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

app.get('/studios.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Studios;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('studios', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

app.get('/games.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Games;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('games', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

app.get('/games_genres.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Games_Genres;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('games_genres', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

app.get('/genres.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM Genres;";
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('genres', {data: rows});                  // Render the index.hbs file, and also send the renderer
        }) 
    });

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});