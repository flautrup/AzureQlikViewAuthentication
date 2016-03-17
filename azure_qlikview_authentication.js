//Example of WSFedService Integration between QV11.20 and Azure
var https = require('https');
var http = require('http');
var qlikauth = require('qlik-auth');
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require("jwt-simple");
var wsfedsaml2 = require('passport-azure-ad').WsfedStrategy;
var passport = require('passport');
var config = require('./config');

var ticketProfile = {
        'UserDirectory': '',
        'UserId': '',
        'Attributes': []
}

var app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());

var wsfedStrategy = new wsfedsaml2(config.azureConfig, function(profile, done) {
    if (!profile.email) {
        done(new Error("No email found"));
        return;
    }
    // validate the user here

    done(null, profile);
});

passport.use(wsfedStrategy);

// Store user
 passport.serializeUser(function(user,done){
	done(null, user.email);
});


//Login URL
app.get('/', passport.authenticate('wsfed-saml2', { failureRedirect: '/', failureFlash: true }), function(req, res) {
    res.redirect('/');
});


// callback from WAAD with a token
app.post('/callback', passport.authenticate('wsfed-saml2', { failureRedirect: '/', failureFlash: true }), function(req, res) {
    console.log("Success "+req.user.email);

	var ticketProfile = {
		'UserDirectory': config.userDirectory,
        'UserId': req.user.email,
        'Attributes': []
	}

	console.log("Request Webticket\n");
	qlikauth.requestWebTicket(req, res, ticketProfile, config.ticketOptions);

});


//Start listener
http.createServer(app).listen(config.port);
