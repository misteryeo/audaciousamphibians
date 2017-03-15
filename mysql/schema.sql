DROP DATABASE IF EXISTS roadchip;

CREATE DATABASE roadchip;

USE roadchip;

CREATE TABLE users (
	id AUTO_INCREMENT,
	username VARCHAR(32);
	password VARCHAR(32);
	email VARCHAR(64);
);

CREATE TABLE trips (
	id AUTO_INCREMENT,
	title VARCHAR(64),
	date DATE,
	start_address VARCHAR(64),
	end_address VARCHAR(64),
	user_id FOREIGN KEY (users.id) REFERENCES users(id)
);

CREATE TABLE places (
	id AUTO_INCREMENT,
	place_id VARCHAR(64),
	name VARCHAR(32),
	lat INT,
	long INT,
	image_id VARCHAR(64)
);

CREATE TABLE categories (


);

CREATE TABLE trips_places (

);