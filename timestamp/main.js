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

  // stores check on slug containing natural language
  var natlan = /[a-zA-Z]/.test(slug);
  // if slug in unix converts to number
  if (!natlan) {
    slug = parseInt(slug);
  }

  var timestamp = new Date(slug);
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

    if (natlan) {
      content = {
        'unix': timestamp.getTime() - timestamp.getTimezoneOffset()*60000,
        'natural': timestring
      }
    } else {
      content = {
        'unix': timestamp.getTime(),
        'natural': timestring
      }
    }
  }

  response.send(content);
});

app.listen(8000, function() {
  console.log('listening on port 8000.')
})

// functions
function convertToUnix(date) {
  console.log(date);
  return date.getTime() - date.getTimezoneOffset();

  // var d = new Date('January 1, 1970');
  // console.log(d.getTime() - d.getTimezoneOffset()*60000);
}
