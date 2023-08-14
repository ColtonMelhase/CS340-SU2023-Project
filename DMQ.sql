-- Colton Melhase
-- Kevin Rossel
-- CS372
-- Data Manipulation Queries

-- *NOTE: ALL QUERY VARIABLES ARE DENOTED BY THE ${} TEMPLATE LITERAL.

-- #####################################################################
-- ===== Universal Queries =====
-- #####################################################################

-- This query is within the universal route in app.js
-- It is a more flexible route where it can take both the table and id to return
-- the specific tuple. This prevents having one route per table when this one route can
-- return the same result.
Select * 
FROM ${table} 
WHERE ${attr}ID=${req.params.id};

-- #####################################################################
-- ===== Customers =====
-- #####################################################################

-- This query is used when accessing the Customers page.
-- It is used to populate the table to see all entries in the Customers table
SELECT * 
FROM Customers;

-- This query is used within the ADD CUSTOMER form. It stores the json form data in the
-- varaible 'data' and injects the data in the query.
INSERT INTO Customers(name, username, email) 
VALUES ('${data['name']}', '${data['username']}', '${data['email']}');

-- This query is used within the UPDATE CUSTOMER form. It stores the json form data in the
-- variable 'data' and injects the data in the query.
UPDATE Customers 
SET name='${data['name']}', username='${data['username']}', email='${data['email']}' 
WHERE customerID = ${data['customerID']};

-- This query is used within the DELETE CUSTOMER form. It stores the json form data in the
-- variable 'data' and injects the data in the query
DELETE FROM Customers 
WHERE customerID = ${data['customerID']};

-- #####################################################################
-- ===== Orders =====
-- #####################################################################

-- This query is used when accessing the Orders page.
-- It gets all Orders and renames the FKs column to more readable names. It then joins Customers and Games
-- so the FKs are presented as names and titles instead of FK numbers.
SELECT Orders.orderID, Customers.name AS customer, Games.title AS game, Orders.orderDate, Orders.pricePaid 
FROM Orders 
LEFT JOIN Customers ON Orders.customerID=Customers.customerID 
LEFT JOIN Games ON Orders.gameID=Games.gameID;
-- This query is used when accessing the orders page.
-- It gets all the Customers data to use within the select field in the ADD ORDERS form
SELECT * 
FROM Customers;
-- This query is used when accessing the orders page.
-- It gets all the Games data to use within the select field in the ADD ORDERS form
SELECT *
FROM Games;

-- This query is used within the ADD ORDER form. It stores the json form data in the
-- variable 'data' and injects the data in the query
INSERT INTO Orders(customerID, gameID, orderDate, pricePaid) 
VALUES ('${data['customerID']}', '${data['gameID']}', '${data['orderDate']}', ${data['pricePaid']});

-- This query is used within the DELETE ORDER form. It stores the json data in the
-- variable 'data' and injects the data in the query.
DELETE FROM Orders 
WHERE orderID = ${data['orderID']}

-- #####################################################################
-- ===== Studios =====
-- #####################################################################

-- This query is used when accessing the Studios page.
-- It gets all the studios to display them within the table.
SELECT * 
FROM Studios;

-- This query is used within the ADD STUDIO form. It stores the json form data in the
-- variable 'data' and injects the data in the query
INSERT INTO Studios(name) 
VALUES ('${data['name']}');

-- This query is used within the DELETE STUDIO form. It stores the json data in the
-- variable 'data' and injects the data in the query.
DELETE FROM Studios 
WHERE studioID = ${data['studioID']};

-- #####################################################################
-- ===== Games =====
-- #####################################################################

-- This query is used when accessing the Games page.
-- It gets all Games and renames the FKs column to more readable names. It then joins Studios
-- so the FKs are presented as names instead of FK numbers.
SELECT Games.gameID, Studios.name AS studio, Games.title, Games.publishDate, Games.price 
FROM Games 
INNER JOIN Studios ON Games.studioID=Studios.studioID;
-- This query is used when accessing the Games page.
-- It gets all the Studios data to use within the select field in the ADD GAME form
SELECT name, studioID 
FROM Studios;

-- This query is used within the ADD GAME form. It stores the json form data in the
-- variable 'data' and injects the data in the query
INSERT INTO Games(studioID, title, publishDate, price) 
VALUES ('${data['studioID']}', '${data['title']}', '${data['publishDate']}', '${data['price']}');

-- This query is used within the UPDATE GAME form. It stores the json form data in the
-- variable 'data' and injects the data in the query.
UPDATE Games 
SET studioID='${data['studioID']}', title='${data['title']}', publishDate='${data['publishDate']}', price='${data['price']}' 
WHERE gameID = ${data['gameID']};

-- This query is used within the DELETE GAME form. It stores the json data in the
-- variable 'data' and injects the data in the query.
DELETE FROM Games 
WHERE Games.gameID = ${data['gameID']};

-- #####################################################################
-- ===== Games Genres =====
-- #####################################################################

-- This query is used when accessing the Games Genres page.
-- It gets all Games_Genre relationships and renames the FKs column to more readable names. It then joins Genres and Games
-- so the FKs are presented as names and titles instead of FK numbers.
SELECT Games.title AS game, Genres.name AS genre, Games.gameID, Genres.genreID 
FROM Games_Genres 
INNER JOIN Games ON Games_Genres.gameID=Games.gameID 
INNER JOIN Genres ON Games_Genres.genreID=Genres.genreID 
ORDER BY Games.title ASC;
-- This query is used when accessing the Games Genres page.
-- It gets all the Games data to use within the select field in the ADD GAMES_GENRES form
SELECT Games.gameID, Games.title 
FROM Games;
-- This query is used when accessing the Games Genres page.
-- It gets all the Genres data to use within the select field in the ADD GAMES_GENRES form
SELECT Genres.genreID, Genres.name 
FROM Genres;

-- This query is used within the ADD GAMES_GENRES form. It stores the json form data in the
-- variable 'data' and injects the data in the query
INSERT INTO Games_Genres(gameID, genreID) 
VALUES ('${data['gameID']}', '${data['genreID']}');

-- This query is used within the DELETE GAMES_GENRES form. It stores the json data in the
-- variable 'data' and injects the data in the query.
DELETE FROM Games_Genres 
WHERE Games_Genres.genreID = ${genreID} AND Games_Genres.gameID = ${gameID};

-- #####################################################################
-- ===== Genres =====
-- #####################################################################

-- This query is used when accessing the Studios page.
-- It gets all the genres to display them within the table.
SELECT * 
FROM Genres;

-- This query is used within the ADD GENRE form. It stores the json form data in the
-- variable 'data' and injects the data in the query
INSERT INTO Genres(name) 
VALUES ('${data['name']}');

-- This query is used within the DELETE GENRE form. It stores the json data in the
-- variable 'data' and injects the data in the query.
DELETE FROM Genres 
WHERE Genres.genreID = ${data['genreID']};