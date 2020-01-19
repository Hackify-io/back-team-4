'use strict';
//Dependencies
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import { keys } from './config/keys';

//Routes
import users from './routes/users';
import logins from './routes/logins';
import clinics from './routes/clinics';

//Services
const app = express();

//Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//DB Config
const db = keys.mongoURI;

//Mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//API Routes
app.use('/api/users', users);
app.use('/api/logins', logins);
app.use('/api/clinics', clinics);
//clinics

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
