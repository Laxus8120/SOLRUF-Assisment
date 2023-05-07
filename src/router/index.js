const express = require('express');

const Router = express.Router();

const v1ApiRoute  = require('./v1/index.js');

Router.use('/v1',v1ApiRoute);
module.exports =  Router;