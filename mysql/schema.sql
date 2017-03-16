DROP DATABASE IF EXISTS roadchip;

CREATE DATABASE roadchip;

USE roadchip;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(32),
	password VARCHAR(64),
	salt INT,
	email VARCHAR(64)
);

CREATE TABLE trips (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64),
	date DATE,
	start_address VARCHAR(100),
	end_address VARCHAR(100),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE places (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(64),
	lat INT,
	lng INT,
	place_id VARCHAR(64),
	image_id VARCHAR(64)
);

CREATE TABLE categories (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(32)
);

CREATE TABLE trips_places (
	id INT PRIMARY KEY AUTO_INCREMENT,
	trip_id INT,
	place_id INT,
	categories_id INT,
	FOREIGN KEY (trip_id) REFERENCES trips(id),
	FOREIGN KEY (place_id) REFERENCES places(id),
	FOREIGN KEY (categories_id) REFERENCES categories(id)
);