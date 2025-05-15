/*
app.js:
Main entry point to launch our full Express-based website.
This file is used to: 
- sets up the Express server
- sets up serves static files
- provide an API route
- handle basic errors
- integrate external JSON data.

Repo reference: https://github.com/anmarjarjees/express-basics
*/

/* 
Adding the Express Minimum Required Boilerplate Template:
Link: https://expressjs.com/en/starter/hello-world.html
*/

// CommonJS Syntax — default for Node.js:
// If you want to use ES6 Modules, you'd need to configure "type": "module" in package.json

// Express.js Framework:
const express = require('express');
// Link: https://expressjs.com/

/*
/*
Node.js path module:
********************
Importing Node.js's built-in "path" module:
- The "path" module provides utilities for working with file and directory paths
- It helps us build file paths in a way that works on all operating systems (Windows, macOS, Linux)
- For example, Windows uses backslashes (\) in paths, while macOS/Linux use forward slashes (/)
- Instead of manually writing paths like:
    > __dirname + "/public"
    we use:
    > path.join() => to create safe and correct paths

    Link: https://nodejs.org/api/path.html
*/
const path = require('path');
/*
Common usage for the "path" object:
path.join() => Joins multiple path segments safely.
path.resolve() => Resolves a full absolute path.
*/

// JSON Modules in Node.js:
// Load external JSON data for the API route:
// This will automatically parse and import the JSON file
const instruments = require('./data/instruments');
// Link: https://nodejs.org/api/modules.html#modules_json_modules
/*
NOTE:
we can also use the following code with specifying the file extension ".json":
const instruments = require('./data/instruments.json');
It's safer and simpler to use:
const instruments = require('./data/instruments');
Node.js will automatically look for instruments.json or instruments.js.
*/

// Express app setup and configuration:
// Create an Express app instance:
const app = express();

/* 
Server Port Number:
*******************
Defining the port number the server will listen on:
> Port 3000 is commonly used in Express examples and tutorials
> We can change it to any available port (like 4000, 5000, etc.)
*/
const port = 3000;

/*
Using 3000 in Express?
**********************
- In Node.js (including Express), we manually create a server 
that listens on a specific port (example: 3000)
- This tells Express **where to listen for incoming requests**
- Unlike PHP, which usually runs under a built-in server like Apache using port 80 (default HTTP),
    > We can just type "localhost" in the browser without specifying a port.
    > But in Express, unless we use port 80, we must include the port (example: localhost:3000).

Link: https://expressjs.com/en/starter/hello-world.html
*/

// Print the directory where the current script resides:
console.log("__dirname: ", __dirname);
// "__dirname" returns the directory of this file

/* 
Middleware: 
***********
Serve static files (HTML, CSS, JS, images) from "public" folder
We use path.join() to ensure cross-platform compatibility
Route prefix: "/site"
*/

// Express static files:
app.use('/site', express.static(path.join(__dirname, 'public')));
// Link: https://expressjs.com/en/starter/static-files.html

/*
With the above line:
> http://localhost:3000/site/index.html
> http://localhost:3000/site/css/style.css
> http://localhost:3000/site/js/app.js
will all work assuming the corresponding files exist inside the "public" folder.
*/

// Homepage route
app.get('/', (req, res) => {
    // Redirects the user to the "index.html" page in the "site" directory:
    res.redirect('/site/index.html');
    // Link: https://expressjs.com/en/api.html#res.redirect
});

// API Route — Serve JSON data from colors.json
// URL: http://localhost:3000/api/instruments
// ---------------------------------------------
// Link: https://expressjs.com/en/guide/routing.html
// API Route — Serve instruments.json
// URL: http://localhost:3000/api/instruments
app.get('/api/instruments', (req, res) => {
    // You can replace this with dynamic data from a database later
    // Send the JSON data as response:
    res.json(instruments);
    console.log("JSON data sent to /api/instruments endpoint");
});

/*
Error Handling Middleware:
**************************
1. Handles 404 - Not Found
2. Logs error stack trace
3. Responds with generic error if applicable

How do I handle 404 responses?
Link: https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses

HTTP response status codes:
Link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
*/
app.use((req, res, next) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.use((err, req, res, next) => {
    console.error("Error Stack Trace:\n", err.stack);
    res.status(500).send("500 - Internal Server Error");
});
/*
The "err.stack" property in Node.js contains the stack trace of the error:
> a detailed report showing where the error occurred in the code
> It's very useful for debugging

Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
*/

// Finally: Starting the server and listen on the specified port:
app.listen(port, () => {
    console.log(`Our Application Sever is running using: http://localhost:${port}`);
});
