// Vhost
var express = require('express'),
	vhost = express();

vhost.use(express.vhost('localhost', require('./apps/site').app));

vhost.listen(3000);