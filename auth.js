"use strict";

/*jshint camelcase: false */

var AzureOAuth2Strategy  = require("passport-azure-oauth2");
var jwt                   = require("jwt-simple");
//var config                = require("config.json");
var config= {	
				clientID: '702fb30b-c625-4158-bf08-27514b0ea711' ,
				clientSecret: 'ZA2Gt8TYXeMynwnGKFe6Eimx2+7gC0GzbuujVKR9S4E=',
				callbackUri: 'http://rd-flp1.qliktech.com:8186/oauth2callback'
			};

function AzureOAuthStrategy() {
    this.passport = require("passport");

    this.passport.use("provider", new AzureOAuth2Strategy({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackUri,
      resource: config.resource,
      tenant: config.tenant,
      prompt: 'login',
      state: false
    },
    function (accessToken, refreshtoken, params, profile, done) {
      var user = jwt.decode(params.id_token, "", true);
      done(null, user);
    }));

    this.passport.serializeUser(function(user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });
}

module.exports = new AzureOAuthStrategy();