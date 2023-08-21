var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const Customer = require('./Router/Customer');
const User = require('./Router/User')
const Login = require('./Router/Login')
const Sale = require('./Router/Sale');
const Store = require('./Router/Store')
const Item = require('./Router/Item')
const Forgetpassword = require('./Router/forgetpassword')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// app.use((req,res,next)=>{
//   let token=req.headers['token']
//   console.log(token)
// })


















 




const cors = require('cors')
app.use(cors())
app.use('/customer', Customer)
app.use('/user', User)
app.use('/item', Item)
app.use('/sale', Sale)
app.use('/store', Store)
app.use('/login', Login)
app.use('/forget', Forgetpassword)


const mongoose = require('mongoose');
const { UserModel } = require('./Model/Users');
const morgan = require('morgan');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/Customer')
  .then(() => console.log('mongodb:Conneted!'))














// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
