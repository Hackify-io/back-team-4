require("babel-register");
require("babel-polyfill");
const functions = require('firebase-functions');
const app = require('./dist/server');
exports.app = functions.https.onRequest(app.default);
