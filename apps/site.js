var express = require('express'),
	app = exports.app = express(),
	config = require('../config.js')(app),
	site = require('../routes/site'),
	engine = require('ejs-locals');

// Interface
app.get("/", site.index);