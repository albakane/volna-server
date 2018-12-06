let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let tj = require('@mapbox/togeojson');
let fs = require('fs');

let connectionRouter = require('./routes/connection');
let dashboardRouter = require('./routes/dashboard');
let trackerRouter = require('./routes/tracker');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let influx = require(path.join(__dirname, "config/influx-connection"));
let mysql = require(path.join(__dirname, "class/mysql"));

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
  influx.query('SELECT * FROM "volnadb_test"."autogen"."location" where time > now() - 1s').then(results => {
    let pilots = [];
    for (let i = 0; i < results.length; i++) {
      if (results[i].time !== undefined) {
        pilots[i] = {
          reg_number : results[i].registration_number,
          lat : results[i].lat,
          lng : results[i].lng
        }
      }
    }
    io.emit('send_coordonates', pilots);
  });
}

app.get('/test_map', function (req, res) {
  setInterval(getLocation, 1000);
  //getLocation();
  res.render('tracking', {
    title : 'Tracking',
    project : 'Volna',
    pilots : [
      'F-GNDH',
      'F-LJRD',
      'F-AFSV',
      'F-PLEF'
    ]
  });
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
app.use('/upload', express.static(path.join(__dirname, 'test_upload')));

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
