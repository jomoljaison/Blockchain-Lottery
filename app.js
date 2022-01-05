var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AddressIdRouter = require("./routes/AddressId");
var BuyRouter = require("./routes/Buy");
var pickWinnerRouter = require("./routes/pickWinner");

winner="";
console.log("Winner",winner);

// web3 integration//

var Web3 = require ('web3');
 
var ContractJSON =  require(path.join(__dirname,'build/contracts/lottery.json'))

web3 =  new Web3("http://localhost:7545");

accountAddress ="0x45f806938f57895A28AC31905Fc3E4aF8B2a7744";

contractAddress = ContractJSON.networks['5777'].address;
console.log("contractAddress",contractAddress);
contract="0x4222801A9Bbc6a5cDe9f249923eb8549D5104ED0";
console.log("contract",contract);

const abi = ContractJSON.abi;

MyContract =  new web3.eth.Contract(abi,contractAddress);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/AddressId', AddressIdRouter);
app.use('/Buy', BuyRouter);
app.use('/pickWinner',pickWinnerRouter);


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
