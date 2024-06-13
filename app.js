// import a global module named http
const http = require('http');

const express = require('express');

// creating an Express application
const app = express();

// Using Express Middleware
app.use((req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`In the middleware!`);

    // Adding next() to allow this Middleware
    // to travel to the next Middleware
    next();
});

// Adding another Express Middleware
app.use((req, res, next) => {
    // This allows us to hook into this Funnel 
    // through which the HTTP request to send
    console.log(`In another middleware!`);

    // Overwritting this Express Middleware default Header
    // res.setHeader();

    // Send a HTTP response with a Body
    res.status(200).send({ message: `Request received` });
});

// execute functions stored in ./routes
// for incoming requests
// const server = http.createServer(app);

// console.log(`routes.someText: ${routes.someText}`);

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});