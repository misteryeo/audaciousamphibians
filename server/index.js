var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var crypto = require('crypto');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: point to build file
// app.use(express.static(__dirname + '/../index.html'));
app.use(express.static(__dirname + '/../build'));



// checks username & pw in db to authenticate
app.post('/login', function(req, res) {

});


app.get('/logout', function(req, res) {

});

// creates user and pw in db
app.post('/signup', function(req, res) {

});


// app.get('/users/:user_id', function(req, res) {
// });

// return list of a user's trips
app.get('/users/:user_id/trips', function(req, res) {

});

app.route('/users/:user_id/trips/:trip_id')
  // SELECT a specific trip
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
    console.log(req.params.user_id);
    res.send('GET-----/users/:user_id/trips/:trip_id');
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
