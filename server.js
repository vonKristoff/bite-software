var express =    require('express'), 
    jade =       require('jade'),
    bodyParser = require('body-parser'),
    middleware = require('./middleware'),
    utils =      require('./utils')


var app = express()

app
  .set('view engine', jade)
  .locals.pretty = true;

// middleware
app
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(middleware.navbar)
  .use(middleware.pageSetter);

// routes
app.use(require('./routes/site'));

app.listen(8000);

// console.log('listening on port 8000')