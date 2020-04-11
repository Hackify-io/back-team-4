const express = require('express');
const expressApp = express();
expressApp.get('/', async (req, res) => {
    res.status(200).json({status: 'App is up and running from External File'});
  });

exports.expressApp = expressApp;