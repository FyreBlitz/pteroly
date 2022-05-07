[![npm](https://img.shields.io/npm/v/pteroly)](https://www.npmjs.com/package/pteroly)
[![GitHub](https://img.shields.io/github/license/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/pulls)

# Pteroly
With pteroly you can easily control your Pterodactyl panel quick and easy with a flawless experience and good support.
Pteroly is always up-to-date and supports the latest versions of the Pterodactyl panel.

[Pteroly Documentation](https://pteroly.fyreblitz.com/)
| [NpmJS Package](https://www.npmjs.com/package/pteroly/)
| [Pteroly PayPal](https://paypal.me/PureNodes)
| [Pteroly Discord](https://discord.gg/8dUwGewqfv)

<u>Benefits of Pteroly:</u>
 - [x] Supports latest Pterodactyl panel
 - [x] Supports nearily every api feature of pterodactyl
 - [x] Easy client panel login, which is only required once
 - [x] Up-to-Date
 - [x] Easy-to-Use
 - [x] Typescript
 - [x] Fast

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
   And then you can call any function you want like this, to find all the functions of the panel consider visiting our [documentation](https://pteroly.fyreblitz.com/).
   

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

# Changelog
Version 1.7.2:
- Fixed bug in server creation that adds "1" as a string to a servers allocations.

# ToDo list
 - [ ] Class support and support of new instances
 - [ ] More features (please suggest features on GitHub)