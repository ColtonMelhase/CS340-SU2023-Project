-- Data manipulation queries

-- ===== Customers =====

-- SELECT all customer information
SELECT * FROM Customers;

-- INSERT a new customer
INSERT INTO Customers (name, username, email) VALUES
(:nameInput, :usernameInput, :emailInput);

-- UPDATE a customer's information
UPDATE Customers
SET name = :nameInput, username = :usernameInput, email = :emailInput
WHERE customerID = :customerIDInput;

-- DELETE a customer
DELETE FROM Customers WHERE customerID=:customerIDInput;

-- ===== Orders =====

-- SELECT all order information
SELECT * FROM Orders;

-- Get all orders with game names and customer names grouped together by customer name
SELECT Customers.name, Games.title, Orders.orderDate, Orders.pricePaid
FROM Orders
INNER JOIN Customers ON Customers.customerID = Orders.customerID
INNER JOIN Games ON Games.gameID = Orders.gameID
GROUP BY Customers.name
ORDER BY Customers.name DESC;

-- INSERT/Place a new order
INSERT INTO Orders (customerID, gameID, orderDate, pricePaid) VALUES
(:customerIDInput, :gameIDInput, GETDATE(), :pricePaidInput);


-- ===== Studios =====

-- SELECT all studio information
SELECT * FROM Studios;

-- INSERT/Create a new game studio
INSERT INTO Studios (name) VALUES
(:nameInput);

-- ===== Games =====

-- SELECT all game information
SELECT * FROM Games;

-- INSERT/Add a new game
INSERT INTO Games (studioID, title, publishDate, price) VALUES
(:studioIDInput, :titleInput, :publishDateInput, :priceInput);

-- DELETE a game
DELETE FROM Games WHERE gameID=:gameIDInput;

-- SEARCH for a game based on title
SELECT * FROM Games
WHERE CONTAINS(title, :titleInput);


-- ===== Games Genres =====


-- ===== Genres =====

-- SELECT/List all genres
SELECT * From Genres;

-- INSERT a new genre
INSERT INTO Genres (name) VALUES
(:nameInput);

