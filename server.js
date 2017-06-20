import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './server/config/passport';

// configure dotenv
dotenv.config();
// Set up the express app
const app = express();

// setup passport authentication
passportConfig(passport);
app.use(passport.initialize());
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup expressValidator Middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg,
      value
    };
  }
}));

// Require our routes into the application.
require('./server/routes')(app);

module.exports = app;
