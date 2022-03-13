[![npm](https://img.shields.io/npm/v/pteroly)](https://www.npmjs.com/package/pteroly)
[![GitHub](https://img.shields.io/github/license/EiskalterFreund/pteroly)](https://github.com/EiskalterFreund/pteroly/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/EiskalterFreund/pteroly)](https://github.com/EiskalterFreund/pteroly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/EiskalterFreund/pteroly)](https://github.com/EiskalterFreund/pteroly/pulls)

# Pteroly
With pteroly you can easily control your Pterodactyl panel without problems.
It is always up-to-date and supports the latest version of the Pterodactyl panel.

[Pteroly Documentation](https://pteroly.purenodes.net/)
| [NpmJS Package](https://www.npmjs.com/package/pteroly/)
| [My PayPal](https://paypal.me/PureNodes)

<u>Benefits of Pteroly:</u>
 - [x] Fast
 - [x] Supports latest Pterodactyl panel
 - [x] up-to-date
 - [x] Supports nearily every api feature of pterodactyl
 - [x] Easy client panel login, which is only required once
 - [x] Typescript
 - [x] Easy

## Quick Start Guide
First install the package to your Node.JS app/project:
> npm install pteroly@latest

Then you require the package and login into the Pterodactyl API:

    const pteroly = require('pteroly');
    const admin = pteroly.Admin;
    const client = pteroly.Client;
    
    // You only need to login once in your entire app/project
    admin.login('HOST_PANEL_URL', 'YOUR_ADMIN_API_KEY', (loggedIn, errorMsg) => {
	    console.log('Login status Admin: ' + loggedIn);
	    if (!loggedIn) console.error(errorMsg);
    });

    client.login('HOST_PANEL_URL', 'YOUR_CLIENT_API_KEY', (loggedIn, errorMsg) => {
	    console.log('Login status Client: ' + loggedIn);
	    if (!loggedIn) console.error(errorMsg);
    });
   And then you can call any function you want like this
   

    // As a .then function
    admin.functionName(<ARGUMENTS>).then((response) => {
        // TODO: Insert your code here.
    }).catch((err) => console.error(err));

    client.functionName(<ARGUMENTS>).then((response) => {
        // TODO: Insert your code here.
    }).catch((err) => console.error(err));
    
    // With await
    const resultAdmin = await admin.functionName(<ARGUMENTS>).catch((err) => console.error(err));
    const resultClient = await client.functionName(<ARGUMENTS>).catch((err) => console.error(err));