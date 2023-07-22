-- vapor.sql
-- Kevin Rossel
-- Colton Melhase

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create Customers table
CREATE OR REPLACE TABLE Customers (
	customerID INT NOT NULL AUTO_INCREMENT UNIQUE,
	name varchar(45) NOT NULL,
	username varchar(45) NOT NULL UNIQUE,
	email varchar(320) NOT NULL UNIQUE,
	PRIMARY KEY (customerID)
);

-- Insert values within the Customers table
INSERT INTO Customers (name, username, email)
VALUES 	('Tony Stark', 				'IWinEveryTime', 	'ironman@gmail.com'),
		('Bill Gates', 				'GameGuru', 		'billgates@outlook.com'),
		('Matthew McConaughey', 	'StarFighter', 		'mattc@yahoo.com'),
		('Barack Obama', 			'Rogue Warrior', 	'number44@whitehouse.gov'),
		('Michael Scott', 			'YouMadBro', 		'mikescott@aol.com');


-- Create Studios table
CREATE OR REPLACE TABLE Studios (
	studioID INT NOT NULL AUTO_INCREMENT UNIQUE,
	name varchar(100) NOT NULL,
	PRIMARY KEY (studioID)
);

-- Insert values within the studios table
INSERT INTO Studios (name)
VALUES 	('Tortoise Softworks'),
		('WinterWorld Interactive'),
		('Fresh Sun Studios'),
		('Microblast Games'),
		('Tiny King Software');


-- create Games table
CREATE OR REPLACE TABLE Games (
	gameID INT NOT NULL AUTO_INCREMENT UNIQUE,
	studioID INT NOT NULL,
	title varchar(45) NOT NULL UNIQUE,
	price decimal(6,2) NOT NULL,
	PRIMARY KEY (gameID),
	FOREIGN KEY (studioID) REFERENCES Studios(studioID) ON DELETE CASCADE
);

-- Insert values within the Games table
INSERT INTO Games (studioID, title, price)
VALUES 	(1, 'Madspace', 			59.99),
		(4, 'Galaxy and Command', 	29.99),
		(2, 'Charge of Rivalry', 	39.99),
		(1, 'Madspace 2', 			69.99),
		(5, 'Forgotten Universe', 	15.99);

-- Create Genres table
CREATE OR REPLACE TABLE Genres (
	genreID INT NOT NULL AUTO_INCREMENT UNIQUE,
	name varchar(50),
	PRIMARY KEY (genreID)
);

-- Insert values within the Genres table
INSERT INTO Genres (name)
VALUES 	('Shooter'),
		('Space'),
		('Strategy'),
		('RPG'),
		('Online');

-- Create Games_Genres table
CREATE OR REPLACE TABLE Games_Genres (
	games_gameID INT NOT NULL,
	genres_genreID INT NOT NULL,
	FOREIGN KEY (games_gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
	FOREIGN KEY (genres_genreID) REFERENCES Genres(genreID) ON DELETE CASCADE
);

-- Insert values within the Games_Genres table
INSERT INTO Games_Genres (games_gameID, genres_genreID)
VALUES 	(1, 1),
		(1, 2),
		(2, 2),
		(2, 3),
		(3, 4),
		(4, 1),
		(4, 2),
		(4, 4),
		(4, 5),
		(5, 2);

-- Create Orders table
CREATE OR REPLACE TABLE Orders (
	orderID INT NOT NULL AUTO_INCREMENT UNIQUE,
	customerID INT,
	gameID INT,
	PRIMARY KEY (orderID),
	FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE SET NULL,
	FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE SET NULL
);

-- Insert value within the Orders table
INSERT INTO Orders (customerID, gameID)
VALUES 	(1, 3),
		(1, 4),
		(3, 2),
		(2, 5),
		(5, 1);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;