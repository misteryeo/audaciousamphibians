var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: point to build file
// app.use(express.static(__dirname + '/../index.html'));
app.use(express.static(__dirname + '/../build'));


// routes

app.post('/login', function(req, res) {

});

app.get('/logout', function(req, res) {

});

app.post('/signup', function(req, res) {

});

app.get('/users', function(req, res) {

});

app.get('/users/trips', function(req, res) {

});

app.route('/users/trips/:id')
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
    console.log(req.params.id);
    res.send('GET-----/users/trips/:id route');
  })
  .post(function(req, res) {

  })
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });

app.get('/users/places', function(req, res) {

});

app.route('/users/places/:id')
  .get(function(req, res) {
    // req.params = { id: 'USER_ID' }
  })
  .post(function(req, res) {

  })
  .put(function(req, res) {

  })
  .delete(function(req, res) {

  });






app.listen(3000, function() {
  console.log('listening on port 3000!');
});