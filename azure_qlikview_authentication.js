//Example of WSFedService Integration between QV11.20 and Azure
//Running on port 8186
var https = require('https');
var http = require('http');
var qlikauth = require('qlik-auth');
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require("jwt-simple");
var wsfedsaml2 = require('passport-azure-ad').WsfedStrategy;
var passport = require('passport');

var ticketProfile = {
        'UserDirectory': '', 
        'UserId': '',
        'Attributes': []
}

var ticketOptions = {
       'Host': 'http://rd-flp1.qliktech.com/',
       'TryUrl': '/QlikView',
       'BackUrl': ''
}

var app = express();

app.use(bodyParser());
app.use(passport.initialize());

var config = {
    realm: 'http://fredriklautrupqlik.onmicrosoft.com/QlikView',
    identityProviderUrl: 'https://login.microsoftonline.com/4ffb63b8-94b2-4bc0-8aad-12268b0ca2af/wsfed',
    identityMetadata: 'https://login.microsoftonline.com/4ffb63b8-94b2-4bc0-8aad-12268b0ca2af/federationmetadata/2007-06/federationmetadata.xml',
    logoutUrl:'http://rd-flp1.qliktech.com:8186/'
};

var wsfedStrategy = new wsfedsaml2(config, function(profile, done) {
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
		'UserDirectory': 'azure', 
        'UserId': req.user.email,
        'Attributes': []
	}
	
	console.log("Request Webticket\n");
	qlikauth.requestWebTicket(req, res, ticketProfile, ticketOptions);
	
});
  

//Start listener
http.createServer(app).listen(8186);



