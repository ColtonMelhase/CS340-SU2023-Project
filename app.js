// App.js

/*
    SETUP
*/
var express = require('express'); // We are using the express library for the web server
var app = express();              // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 22222;                     // Set a port number at the top so it's easy to change in the future

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
    let query2 = "SELECT name, studioID FROM Studios;";
    db.pool.query(query1, function(error1, rows1, fields1) {     // Execute query1
        db.pool.query(query2, function(error2, rows2, fields2) { // Execute query2
            res.render('games', {data: rows1, data2: rows2});    // Render the index.hbs file, and also send the renderer
        })
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
    console.log(`QUERY: SELECT * FROM ${table} WHERE ${attr}ID=${req.params.id}`);
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

// *****************************************************************************************
// STUDIO FUNCTIONS
// *****************************************************************************************

// ADD STUDIO
app.post('/addStudio', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO Studios(name) VALUES ('${data['name']}');`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/studios.hbs');
        }
    })
})

// DELETE STUDIO
app.post('/deleteStudio', function(req, res) {
    let data = req.body;
    let query = `DELETE FROM Studios WHERE studioID = ${data['studioID']};`

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/studios.hbs');
        }
    })
})

// *****************************************************************************************
// GAME FUNCTIONS
// *****************************************************************************************

// INSERT GAME
app.post('/addGame', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO Games(studioID, title, publishDate, price) VALUES ('${data['studioID']}', '${data['title']}', '${data['publishDate']}', '${data['price']}');`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/games.hbs');
        }
    })
})

// DELETE GAME
app.post('/deleteGame', function(req, res) {
    let data = req.body;

    let query = `DELETE FROM Games WHERE Games.gameID = ${data['gameID']};`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/games.hbs');
        }
    })
})

// *****************************************************************************************
// GENRE FUNCTIONS
// *****************************************************************************************

// INSERT GENRE
app.post('/addGenre', function(req, res) {
    let data = req.body;

    let query = `INSERT INTO Genres(name) VALUES ('${data['name']}');`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/genres.hbs');
        }
    })
})

// DELETE GENRE
app.post('/deleteGenre', function(req, res) {
    let data = req.body;

    let query = `DELETE FROM Genres WHERE Genres.genreID = ${data['genreID']};`;

    db.pool.query(query, function(error, rows, fields) {
        if(error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/genres.hbs');
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
