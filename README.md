#Azure QlikView authentication

##Description
This is an example of using the QlikView web ticket API to integrate with Azure AD using WSFederation. 
The code is written using NodeJS and uses the qlik-auth for ticketing and passport-azure-ad for integration with Azure

##Installation
*	Install nodejs found at http://nodejs.org/
*	Download the AzureQlikViewAuthentication.zip 
*	Unzip AzureQlikViewAuthentication
*	From the command prompt go to the directory where you unzipped AzureQlikViewAuthentication
*	Run npm install
*	Add an application to your Azure AD, and get the realm, identityProviderUrl and identityMetadata and add that to the config.js file
*	Configure the web ticket server, try  and back and if a document should be opened
*	Add the IP address of the servers that is going to request a web ticket to the config.xml C:\ProgramData\QlikTech\WebServer
	Example
	```		<GetWebTicket url="/QvAjaxZfc/GetWebTicket.aspx">
			<TrustedIP>192.168.0.2</TrustedIP>
			<TrustedIP>192.168.0.3</TrustedIP>
		</GetWebTicket> ```
*	Go to the QMC and change the QVS to use DMS mode
*	Change the QlikView webserver to always authenticate
*	Run "node azure_qlikview_authentication.js"


##Use
Access the server where you run the node script using http://[host]:port/. You should get redirected to Azure to authenticate and if 
successful get redirected back to QlikView and access the system using the e-mail address as the username.
	


