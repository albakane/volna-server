let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let Influx = require('influx');
let tj = require('@mapbox/togeojson');
let fs = require('fs');
let DOMParser = require('xmldom').DOMParser;

let connectionRouter = require('./routes/connection');
let dashboardRouter = require('./routes/dashboard');
let trackerRouter = require('./routes/tracker');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let influx = new Influx.InfluxDB({
  host : '192.168.1.26',
  database : 'volnadb_test',
  schema : [
    {
      measurement : 'location',
      fields : {
        lat : Influx.FieldType.FLOAT,
        lng : Influx.FieldType.FLOAT
      },
      tags : [
        'registration_number'
      ]
    }
  ]
});

io.on('connection', function(socket) {
  console.log('A user is connected');
  socket.on('page', function(message) {
    if (message === 'TRACKING_PAGE') {
      let geoJSON = JSON.parse(fs.readFileSync('geoJSON/B.json', 'utf8'));
      io.emit('send_way', geoJSON);
    }
  })
});

function getLocation () {
  influx.query('SELECT mean("lat"), mean("lng") FROM "volnadb_test"."autogen"."location" WHERE "registration_number"=\'F-FDHN\'').then(results => {
    io.emit('send_coordonates', {lat : results[0].mean, lng : results[0].mean_1});
  });
}

//setInterval(getLocation, 100);

// TEST KML FILES
/*let kml = new DOMParser().parseFromString(fs.readFileSync('public/kml/B.kml', 'utf8'));
let converted = tj.kml(kml, { styles : true } );
fs.writeFileSync('public/kml/B.json', JSON.stringify(converted), 'utf8');
console.log(converted);
*/

app.get('/test_map', function (req, res) {
  res.render('tracking', { title : 'Tracking', project : 'Volna' });
});

// Session configuration
app.use(session({
  secret : 'qhbapizeurafazrgbiae',
  resave : false,
  saveUninitialized : true,
  cookie : {
    secure : false
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', connectionRouter);
app.use('/dashboard', dashboardRouter);
app.use('/tracker', trackerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(666);

module.exports = app;
