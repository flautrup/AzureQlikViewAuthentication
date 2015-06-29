//Example of OAuth2 Integration between QV11.20 and Azure
//Running on port 8186
var https = require('https');
var http = require('http');
var fs = require('fs');
var qlikauth = require('qlik-auth');
var auth    = require("./auth");
var express = require("express");
var app     = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var profile = {
        'UserDirectory': '', 
        'UserId': '',
        'Attributes': []
}

var options = {
       'Host': 'http://localhost',
       'TryUrl': '/QlikView',
       'BackUrl': '',
       'Document': 'Movies Database'
}

//app.use(auth.passport.initialize());
//app.use(auth.passport.session());

app.use(bodyParser());
app.use(cookieParser('Test'));
app.use(auth.passport.session());
app.use(auth.passport.initialize());
//app.use(app.router);

//Login URL
 app.get('/', auth.passport.authenticate('azure-oauth2', { successRedirect: "/" }));

// Callback OAuth
app.get('/oauth2callback', 
    auth.passport.authenticate('azure-oauth2', function(req,res) { 
		var profile = {
			'UserDirectory': 'AZure', 
			'UserId': req.user.username,
			'Attributes': []
		}
		
		qlikauth.requestTicket(req, res, profile, options);
	}));
  

app.get('/logout', function (req, res) {
      res.redirect('https://accounts.google.com/Logout');
});



//Server options to run an HTTPS server
//var httpsoptions= {
//};


//Start listener
http.createServer(app).listen(8186);



