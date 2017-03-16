var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var crypto = require('crypto');
var db = require('../mysql/index.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: point to build file
// app.use(express.static(__dirname + '/../index.html'));
app.use(express.static(__dirname + '/../build'));


// sample data from query to /login:
// [
//   {
//     "id": 1,
//     "username": "keith123",
//     "password": "ilovekeith",
//     "salt": 456,
//     "email": "keith@email.com"
//   }
// ]


// checks username & pw in db to authenticate
app.post('/login', function(req, res) {
  var username = req.body.username;
  var pw = req.body.password;

  db.query('SELECT * FROM users WHERE username = ?', [username], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // add salt to pw then hash
      var hash = crypto.createHmac('sha256', results[0].salt)
        .update(pw)
        .digest('hex');
      // check to see if hash === password from db
      if (hash === results[0].password) {
        res.send('success');
      } else {
        res.send('invalid');
      }
    }
  });


});


app.get('/logout', function(req, res) {

});

// INSERT user and pw in db
app.post('/signup', function(req, res) {
  var username = req.body.username;
  var pw = req.body.password;
  var email = req.body.email;

  // query db to see if username exists
  db.query('SELECT * FROM users WHERE username = ?', [username], function(err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      if (results[0]) {
        res.send('exists');
      } else {
        // generate salt for user
        var salt = Math.floor(Math.random() * 10000).toString();
        // hash password+salt
        var hash = crypto.createHmac('sha256', salt)
          .update(pw)
          .digest('hex');
        // insert username, hashed pw, salt, email
        db.query('INSERT INTO users (username, password, salt, email) VALUES (?, ?, ?, ?)', [username, hash, salt, email], function(err, results, fields) {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.send('added user');
            }
        });
      }
    }
  });
});


// app.get('/users/:user_id', function(req, res) {
// });

// return list of a user's trips
app.get('/users/:user_id/trips', function(req, res) {
  var userId = req.params.user_id;

  // query database for trips where trips.user_id = userId

  db.query('SELECT * FROM trips WHERE user_id = ?', [userId], function(err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });


});

app.route('/users/:user_id/trips/:trip_id')
  // SELECT a specific trip
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
  })
  // INSERT a trip
  .post(function(req, res) {

  })
  // UPDATE trip -> trips_places -> places
  .put(function(req, res) {

  })
  // DELETE a trip
  .delete(function(req, res) {

  });

// return all places for a specific trip
// note: edited route to include trip_id, removed bc redundancy below
// app.get('/users/:user_id/trips/:trip_id/places', function(req, res) {
// });

app.route('/users/:user_id/trips/:trip_id/places')
  // return all places for a specific trip
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
  })
  // INSERT place into a specific trip
  .post(function(req, res) {

  })
  // PUT not needed
  // .put(function(req, res) {

  // })
  // DELETE a place from a trip
  .delete(function(req, res) {

  });

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
