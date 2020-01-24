"use strict";
//Dependencies
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import { keys } from "./config/keys";

//Routes
import users from "./routes/users";
import logins from "./routes/logins";
import procedures from "./routes/procedures";
import places from "./routes/places";
import clinics from "./routes/clinics";
import appointments from "./routes/appointments";

//Services
const app = express();
import cors from "cors";

//data seed helper
import { seedClinics } from "./helpers/clinicsSeedMethod";

//Enable CORS
app.use(cors());

//DB Config
const db = keys.mongoURI;

//Mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//API Routes
app.use("/api/users", users);
app.use("/api/logins", logins);
app.use("/api/procedures", procedures);
app.use("/api/places", places);
app.use("/api/clinics", clinics);
app.use("/api/clinics/:clinicId/appointments", appointments);

//clinics

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// seedClinics();
