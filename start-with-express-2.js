// import a global module named http
const http = require('http');

const express = require('express');

// creating an Express application
const app = express();

app.use('/', (req, res, next) => {
    console.log(`This always acts as an actuator`);
    next();
});

app.use('/add-product', (req, res, next) => {
    // This allows us to hook into this Funnel
    // through which the HTTP response to send
    console.log(`Using another middleware!`);

    // Send a HTTP response with a Body
    res.status(200).send(`<h1>This is /add-product page</h1>`);

    // because res.status(200).send(); above
    // has already ended middleware with a Response
    // using a next() here will be problematic
    // next(); // remove this line
});

// Adding another Express Middleware
// for route '/'
app.use('/', (req, res, next) => {
    // This allows us to hook into this Funnel
    // through which the HTTP response to send
    console.log(`Using a middleware!`);

    // Send a HTTP response with a Body
    res.status(200).send({ message: `Request received` });
});

const port = 3005;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});