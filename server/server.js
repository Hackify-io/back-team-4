'use strict';
//Dependencies
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import ip from 'ip';
import path from 'path';
import { keys } from './config/keys';

//Routes
import healthCheck from './routes/healthcheck';
import users from './routes/users';
import logins from './routes/logins';
import specialties from './routes/specialties';
import places from './routes/places';
import clinics from './routes/clinics';
import appointments from './routes/appointments';
import feedbacks from './routes/feedbacks';
import doctors from './routes/doctors';

//Services
const app = express();
import cors from 'cors';

//data seed helper
import { seedSpecialties } from './helpers/specialtiesSeedMethod';
import { seedPlaces } from './helpers/placesSeedMethod';
import { seedDoctors } from './helpers/doctorsSeedMethod';

//Enable CORS
app.use(cors());
//DB Config
const db = keys.mongoURI;
console.log(db);
console.log('/////////////');
console.log(db);
console.log('/////////////');
//Mongoose
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`Mongoose Error(${ip.address()}):`, err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//API Routes
app.use('/api/healthcheck', healthCheck);
app.use('/api/users', users);
app.use('/api/logins', logins);
app.use('/api/specialties', specialties);
app.use('/api/places', places);
app.use('/api/clinics', clinics);
app.use('/api/doctors', doctors)
app.use('/api', appointments);
app.use('/api/clinics', feedbacks);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running ${process.env.NODE_ENV} environment on port ${port}`));

seedSpecialties();
seedPlaces();
seedDoctors();

export default app;