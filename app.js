// App.js

/*
    SETUP
*/
var express = require('express'); // We are using the express library for the web server
var app = express();              // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 22221;                     // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.render('index');            // Render the index.hbs file, and also send the renderer
                                    // an object where 'data' is equal to the 'rows' we
});                                 // requesting the web site.

app.get('/customers.hbs', function(req, res) {
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        res.render('customers', {data: rows});              // Render the index.hbs file, and also send the renderer
    })
});

app.get('/orders.hbs', function(req, res) {
    let query1 = "SELECT Orders.orderID, Customers.name AS customer, Games.title AS game, Orders.orderDate, Orders.pricePaid FROM Orders LEFT JOIN Customers ON Orders.customerID=Customers.customerID LEFT JOIN Games ON Orders.gameID=Games.gameID;";
    let query2 = "SELECT * FROM Customers;";
    let query3 = "SELECT * FROM Games;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        var data = rows;
        // console.log(rows);
        db.pool.query(query2, (error, rows, fields) => {
            var customers = rows;
            // console.log(rows);
            db.pool.query(query3, (error, rows, fields) => {
                var games = rows;

                res.render('orders', {data: data, customers: customers, games: games}); 
            })
               
        })// Render the index.hbs file, and also send the renderer
    })
});

app.get('/studios.hbs', function(req, res) {
    let query1 = "SELECT * FROM Studios;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        res.render('studios', {data: rows});                // Render the index.hbs file, and also send the renderer
    })
});

app.get('/games.hbs', function(req, res) {
    let query1 = "SELECT Games.gameID, Studios.name AS studio, Games.title, Games.publishDate, Games.price FROM Games INNER JOIN Studios ON Games.studioID=Studios.studioID;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        res.render('games', {data: rows});                  // Render the index.hbs file, and also send the renderer
    })
});

app.get('/games_genres.hbs', function(req, res) {
    let query1 = "SELECT Games.title AS game, Genres.name AS genre FROM Games_Genres INNER JOIN Games ON Games_Genres.gameID=Games.gameID INNER JOIN Genres ON Games_Genres.genreID=Genres.genreID ORDER BY Games.title ASC;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        res.render('games_genres', {data: rows});           // Render the index.hbs file, and also send the renderer
    })
});

app.get('/genres.hbs', function(req, res) {
    let query1 = "SELECT * FROM Genres;";
    db.pool.query(query1, function(error, rows, fields) {   // Execute the query
        res.render('genres', {data: rows});                 // Render the index.hbs file, and also send the renderer
    })
});

// *****************************************************************************************
// UNIVERSAL ROUTE FUNCTIONS
// *****************************************************************************************

//GET ID FROM TABLE
app.get('/:table/:id', function(req, res) {
    let table = req.params.table;
    let attr = req.params.table.toLowerCase().substring(0, req.params.table.length - 1);
    let id = req.params.id
    console.log(req.params);
    let query = `Select * FROM ${table} WHERE ${attr}ID=${req.params.id};`

    db.pool.query(query, function(error, result, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.json(result[0]);
        }
    })
})
// *****************************************************************************************
// CUSTOMER FUNCTIONS
// *****************************************************************************************

// ADD CUSTOMER
app.post('/addCustomer', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO Customers(name, username, email) VALUES ('${data['name']}', '${data['username']}', '${data['email']}');`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers.hbs');
        }
    })
})

// UPDATE CUSTOMER
app.post('/updateCustomer', function(req, res) {
    let data = req.body;
    let query = `UPDATE Customers SET name='${data['name']}', username='${data['username']}', email='${data['email']}' WHERE customerID = ${data['customerID']};`

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers.hbs');
        }
    })
})

// DELETE CUSTOMER
app.post('/deleteCustomer', function(req, res) {
    let data = req.body;
    let query = `DELETE FROM Customers WHERE customerID = ${data['customerID']};`

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/customers.hbs');
        }
    })
})

// *****************************************************************************************
// ORDER FUNCTIONS
// *****************************************************************************************

// ADD ORDER
app.post('/addOrder', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO Orders(customerID, gameID, orderDate, pricePaid) VALUES ('${data['customerID']}', '${data['gameID']}', '${data['orderDate']}', ${data['pricePaid']});`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/orders.hbs');
        }
    })
})


// DELETE ORDER
app.post('/deleteOrder', function(req, res) {
    let data = req.body;
    let query = `DELETE FROM Orders WHERE orderID = ${data['orderID']};`

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/orders.hbs');
        }
    })
})
/*
    LISTENER
*/
// This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
app.listen(PORT, function() {    
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
