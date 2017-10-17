const express = require('express')
const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');

// month array
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
 'August', 'September', 'October', 'November', 'December'];

// routes
app.get('/', function(request, response) {
  response.render('home.hbs');
});

app.get('/:slug', function(request, response) {
  var slug = request.params.slug;
  // console.log(slug);
  var timestamp = new Date(parseInt(slug));
  var valid = timestamp.getTime() >= 0;
  // console.log(valid);
  var content = {
    'unix': null,
    'natural': null
  }
  // if proper unix timestamp
  if (valid) {
    var timestring = months[timestamp.getUTCMonth()] + ' '
                  +  timestamp.getUTCDate() + ', ' + timestamp.getUTCFullYear()
    content = {
      'unix': timestamp.getTime(),
      'natural': timestring
    }
    response.send(content)
  } else {
    // else return null
    response.send(content);
  }
  
  // if proper natural language timestamp

});

app.listen(8000, function() {
  console.log('listening on port 8000.')
})
