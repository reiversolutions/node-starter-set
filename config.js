 // Export configuration
var express = require('express'),
	engine = require('ejs-locals'),
	mongo = require('mongoose');

module.exports = function(app){
		
	app.requireAuth = false;

	app.use(express.static(__dirname + '/res'));
	
	app.use(express.logger('dev'));
	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.engine('ejs', engine);
	
	//generic config
	app.configure(function(){
		
		app.use(express.cookieParser('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'));
		app.use(express.session({
		  secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
		  maxAge: 3600000
		}));
		
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		
		app.use(express.favicon(__dirname + '/res/images/favicon.ico'));
		
		app.use(app.router);
		
		// Handle errors
		app.use(function(err, req, res, next) {
			if (~err.message.indexOf('not found')) return next();
			
			var ua = req.headers['user-agent'].toLowerCase(),
				type = 'desktop';
			if (ua.search(/msie/i) != -1) {
				type = 'ie'
			}
			res.status(500).render('errors/500.ejs', { title:'500: Internal Server Error', error: err.stack, 
				desc : '500', browser: type});
		});
		app.use(function(req, res, next) {
			var ua = req.headers['user-agent'].toLowerCase(),
				type = 'desktop';
			if (ua.search(/msie/i) != -1) {
				type = 'ie'
			}
			
			res.status(404).render('errors/404.ejs', { title: '404: File Not Found', desc : '404', 
				browser: type});
		});
	});
};