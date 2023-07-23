-- Data manipulation queries

-- ===== Customers =====

-- Get all customers
SELECT name, username, email FROM Customers;

-- Add a new customer
INSERT INTO Customers (name, username, email) VALUES
(:nameInput, :usernameInput, :emailInput);


-- ===== Orders =====

-- Get all orders with game names and customer names grouped together by customer name
SELECT Customers.name, Games.title, Orders.orderDate, Orders.pricePaid
FROM Orders
INNER JOIN Customers ON Customers.customerID = Orders.customerID
INNER JOIN Games ON Games.gameID = Orders.gameID
GROUP BY Customers.name
ORDER BY Customers.name DESC;

-- Place a new order
INSERT INTO Orders (customerID, gameID, orderDate, pricePaid) VALUES
(:customerIDInput, :gameIDInput, GETDATE(), :pricePaidInput);


-- ===== Studios =====


-- ===== Games =====


-- ===== Games Genres =====


-- ===== Genres =====


