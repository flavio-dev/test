const express = require('express');
const morgan = require('morgan');
const indexRoute = require('./routes/index.route');
const matchesRoute = require('./routes/matches.route');
const errorRoute = require('./routes/error.route');
const db = require('./database/matches.json');

const app = express();

// logging middleware
app.use(morgan('dev'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// routing middleware
app.use('/api', indexRoute);
app.use('/api/matches', matchesRoute);
app.use('*', errorRoute);

// sets the current user to the first user in the matches
app.set('user', db.matches[0]);

module.exports = app;