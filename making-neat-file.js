const fs = require('fs');
const http = require('http');
const path = require('path');
const { format } = require('date-fns');

// using ES6 arrow function
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
});

const port = 3005;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});