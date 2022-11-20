[![Npmjs](https://img.shields.io/npm/v/pteroly)](https://www.npmjs.com/package/pteroly)
[![GitHub](https://img.shields.io/github/license/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/FyreBlitz/pteroly)](https://github.com/FyreBlitz/pteroly/pulls)
[![Build](https://github.com/FyreBlitz/pteroly/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/FyreBlitz/pteroly/actions/workflows/node.js.yml)

# Pteroly
A high-speed API wrapper for pterodactyl which can easily utilize the latest API of the panel and with amazing customizability, update-checker, support in the Discord, and very fast caching.
Caching (when enabled) speeds up speed by 98.49% on average.

[Pteroly Documentation](https://pteroly.fyreblitz.com/)
| [NpmJS Package](https://www.npmjs.com/package/pteroly/)
| [Pteroly PayPal](https://paypal.me/PureNodes)
| [Pteroly Discord](https://discord.gg/8dUwGewqfv)

<u>Benefits of Pteroly:</u>
 - [x] Extremely fast
 - [x] Supports auto-complete of your IDE, so you don't always need to vist docs
 - [x] Supports latest version of the Pterodactyl Panel
 - [x] Supports virtually every API feature of Pterodactyl
 - [x] Global API login for the entire Node.JS project
 - [x] Always Up-To-Date
 - [x] Easy-to-Use
 - [x] Typescript

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
Version 1.9.2:
- Added depagination back with less to no ratelimits (optimized)

# To-do list
 - [ ] Class support and support of new instances (with v2.0.0)
 - [ ] More features (please suggest features on GitHub)