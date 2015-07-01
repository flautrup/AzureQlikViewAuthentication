var config = {}

//Azure configuration
config.azureConfig = {
    realm: 'http://fredriklautrupqlik.onmicrosoft.com/QlikView',
    identityProviderUrl: 'https://login.microsoftonline.com/4ffb63b8-94b2-4bc0-8aad-12268b0ca2af/wsfed',
    identityMetadata: 'https://login.microsoftonline.com/4ffb63b8-94b2-4bc0-8aad-12268b0ca2af/federationmetadata/2007-06/federationmetadata.xml',
    logoutUrl:'http://rd-flp1.qliktech.com:8186/'
};

//Ticket configuration
config.ticketOptions = {
       'Host': 'http://rd-flp1.qliktech.com/',
       'TryUrl': '/QlikView',
       'BackUrl': ''
}

config.userDirectory = 'azure';

config.port='8186';

module.exports = config;