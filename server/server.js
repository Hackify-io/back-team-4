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
import clinicrates from './routes/clinicrates';
import clinicreviews from './routes/clinicreviews';
import events from './routes/events';
import blogs from './routes/blogs';

//Services
const app = express();
import cors from 'cors';

//data seed helper
import { seedDb } from './helpers/dataSeeder';

//Enable CORS
app.use(cors());
//DB Config
const db = keys.mongoURI;
//Mongoose
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Mongoose Error(${ip.address()}):`, err));

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
app.use('/api/doctors', doctors);
app.use('/api', appointments);
app.use('/api/clinics', feedbacks);
app.use('/api/clinics', clinicrates);
app.use('/api/clinics', clinicreviews);
app.use('/api/events', events);
app.use('/api/blogs', blogs);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server running ${
      process.env.NODE_ENV ? process.env.NODE_ENV : 'Local'
    } environment on port ${port}`
  )
);

seedDb();

export default app;
