'use strict';
//Dependencies

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _keys = require('./config/keys');

var _healthcheck = require('./routes/healthcheck');

var _healthcheck2 = _interopRequireDefault(_healthcheck);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _logins = require('./routes/logins');

var _logins2 = _interopRequireDefault(_logins);

var _specialties = require('./routes/specialties');

var _specialties2 = _interopRequireDefault(_specialties);

var _places = require('./routes/places');

var _places2 = _interopRequireDefault(_places);

var _clinics = require('./routes/clinics');

var _clinics2 = _interopRequireDefault(_clinics);

var _appointments = require('./routes/appointments');

var _appointments2 = _interopRequireDefault(_appointments);

var _feedbacks = require('./routes/feedbacks');

var _feedbacks2 = _interopRequireDefault(_feedbacks);

var _doctors = require('./routes/doctors');

var _doctors2 = _interopRequireDefault(_doctors);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dataSeeder = require('./helpers/dataSeeder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Services
var app = (0, _express2.default)();

//Routes


//data seed helper


//Enable CORS
app.use((0, _cors2.default)());
//DB Config
var db = _keys.keys.mongoURI;
console.log(db);
console.log('/////////////');
console.log(db);
console.log('/////////////');
//Mongoose
_mongoose2.default.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }).then(function () {
  return console.log('MongoDB Connected');
}).catch(function (err) {
  return console.log('Mongoose Error(' + _ip2.default.address() + '):', err);
});

//Body Parser
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

//Passport Middleware
app.use(_passport2.default.initialize());

//Passport Config
require('./config/passport')(_passport2.default);

//API Routes
app.use('/api/healthcheck', _healthcheck2.default);
app.use('/api/users', _users2.default);
app.use('/api/logins', _logins2.default);
app.use('/api/specialties', _specialties2.default);
app.use('/api/places', _places2.default);
app.use('/api/clinics', _clinics2.default);
app.use('/api/doctors', _doctors2.default);
app.use('/api', _appointments2.default);
app.use('/api/clinics', _feedbacks2.default);

var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log('Server running ' + process.env.NODE_ENV + ' environment on port ' + port);
});

(0, _dataSeeder.seedDb)();

exports.default = app;
//# sourceMappingURL=server.js.map