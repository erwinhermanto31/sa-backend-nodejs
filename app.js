require('./config/config');     //instantiate configuration variables
require('./global_functions');  //instantiate global functions

console.log("Environment:", CONFIG.app)

var createError = require('http-errors');
const express 		= require('express');
var path = require('path');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');

const route = require('./routes/route');

const app = express();

app.use(express.static('public'));

cookieParser = require('cookie-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//DATABASE
// const models = require("./models");
// models.sequelize.authenticate().then(() => {
//     console.log('Connected to SQL database:', CONFIG.db_name);
// })
// .catch(err => {
//     console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
// });
// if(CONFIG.app==='dev'){
//     models.sequelize.sync();//creates table if they do not already exist
//     // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
// }
// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type, apikey');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/api', route);

app.use('/', function(req, res){
	res.statusCode = 200;//send the appropriate status code
	res.json({status:"success", message:"Parcel Pending API", data:{}})
});

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

module.exports = app;