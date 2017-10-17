const express = require('express')
const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');

// routes
app.get('/', function(request, response) {
  response.render('home.hbs');
});

app.get('/:slug', function(request, response) {
  var content = {
    'unix timestamp': null,
    'natural timestamp': null
  }
  // if proper unix timestamp
  // if proper natural language timestamp
  // else return null
  response.send(content);
});

app.listen(8000, function() {
  console.log('listening on port 8000.')
})
