var mysql = require('mysql');

var connection = mysql.createConnection({
	//host: localhost
	user: 'root',
	password: '',
	database: 'roadchip'
});

connection.connect(function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to roadchip database successful!');
	}
});

module.exports = connection;

