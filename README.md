# des-node-express-demo
This project is a complete and enhanced version of a Node.js + Express web application designed for the **Digital Ecosystem (DES)** course. It demonstrates how to build and structure a backend application using Express, with added features and improvements over the basic version.

This enhanced version includes better code structure, routing, middleware, and example API endpoints. It is meant for teaching purposes and is beginner-friendly.

It is ideal for beginners who want to learn how to:
- Set up a Node.js + Express environment
- Serve a full HTML/CSS/JS website
- Organize public assets and mock data
- Use nodemon for automatic server restarts during development

---

# Technologies Used:
- [Node.js](https://nodejs.org/) => Node.js JS Environment
- [Express.js](https://expressjs.com/) => Express.js Back-End JS/Node Framework
- [Nodemon](https://github.com/remy/nodemon) => for live reloading
- [dotenv](https://www.npmjs.com/package/dotenv) => for managing environment variables
- [morgan](https://www.npmjs.com/package/morgan) => for logging HTTP requests
- [EJS](https://ejs.co/) (optional, if you use it for templating)
- [Body-parser](https://www.npmjs.com/package/body-parser) (optional, depending on setup)

---

# Project Structure:
- public => All Static files (CSS, JS, images)
    - index.html => Home page (entry point)
- data => Contains our Data
    - instruments.js => JSON files with mock data
- app.js => Main application entry point
- package.json => Project metadata and dependencies
- README.md => Project instructions (this file)
- These are extra to be used in our in-class advanced coding in other lecture:
    - controllers => Route logic (optional)
    - views => EJS templates (if used)
    - routes => Route definitions - modular (optional)

# Project Setup Steps:
1. Initialize the Project
Create a folder and open it in your terminal, then run:
```
npm init -y
```
This creates a default `package.json` file.

2. Install Express
Install Express as a required dependency:
```
npm i express
```

3. Create a public/ Folder
This folder will hold all website static files, including:
- HTML pages (home, about, etc.)
- Images and videos
- CSS files
- Client-side JavaScript files (if needed)

By Express convention, we name this folder public. Express can serve it automatically using:
```js
app.use(express.static('public'));
```

4. Create a data/ Folder (Optional)
This folder will contain static data files in JSON format (if you want to simulate a small backend API or feed HTML content):
```
/data/items.json
```

You can load these in app.js like this:
```
const items = require('./data/items.json');
```

5. Update package.json Entry Point (Optional)
By default, npm init sets this:
```
"main": "index.js" 
```
Update it to:

```
"main": "app.js"
```

Then we can start the app with:
```
node .
```
This tells Node.js to run app.js automatically.

# Starting The Server JS File:
Create a simple app.js file that loads Express, sets up routing, and starts the server. 
Example:
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
Link: https://expressjs.com/en/starter/hello-world.html

---

# Using `nodemon` for Auto-Reload (Optional But Recommended!)
nodemon is a development tool that automatically restarts the server whenever a file changes.

1. Install nodemon as a dev dependency:
```
npm install nodemon --save-dev
```

This will add it to devDependencies:
```json
"devDependencies": {
  "nodemon": "^3.x.x"
}
```

2. Update the scripts section in package.json:
```json
"scripts": {
  "start": "nodemon app.js",
  "dev": "nodemon app.js"
}
```

3. Finally, we can run our app using either from the following ways:
- npm start => for running normally
- npm run dev => for development with auto-reload

# References, Resources, and Credits:
- Express.js Installation Guide
- My GitHub Repositories:
  - https://github.com/anmarjarjees/express-node-website
  - https://github.com/anmarjarjees/express-basics
  - https://github.com/anmarjarjees/express-application
  - https://github.com/anmarjarjees/express-website-hbs
  - https://github.com/anmarjarjees/node.js-start
  - https://github.com/anmarjarjees/ECMAScript6
  - https://github.com/anmarjarjees/js-frameworks

