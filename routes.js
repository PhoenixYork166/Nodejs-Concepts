const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        // console.log(req.url, req.method, req.headers); // Log the request URL to the console
        res.statusCode = 200; // HTTP res status code
        // passing a header to res
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // returning to stop subsequent code execution
        return res.end();
    }
    
    if (url === '/message' && method === 'POST') {
        // preparing to store data chunk in an array
        const body = [];
    
        // Record dateTime for Message-${now}.txt
        const now = new Date();
        const formattedNow = format(now, 'yyyy-MM-dd__HH_mm_ss');
    
        // Registering 'data' Event Listener to the Event Loop
        // Listen on Data events using anonymous ES6 arrow function
        req.on('data', (chunk) => {
            console.log(`chunk:`);
            console.log(chunk);
            // appending each data chunk
            body.push(chunk);
        });
    
        // Registering 'end' Event Listener to the Event Loop
        // fs.writeFile() will execute even Response is already gone
        req.on('end', () => {
            // Data is received in chunks (Instances of Buffer)
            // Chunks are collected into an array
            // Once all chunks are received (end Event Loop)
            // they are concatenated using Buffer.concat()
            // Need to know incoming data to be String
            // Will need to change data type if parsing a File
            const parsedBody = Buffer.concat(body).toString();
            console.log(`Parsed Body:\n${parsedBody}`);
    
            // message = spliting message=input
            // [1] taking 2nd element => input
            // [0] taking 1st element => message
            const message = parsedBody.split('=')[1];
            const messagePath = path.join(__dirname, 'message', `message-${formattedNow}.txt`);

            try {
                // async fs writeFile method
                fs.writeFile(messagePath, message, (err) => {
                    if (err) {
                        console.error(`Error:\n${err}`);
                        res.statusCode = 501;
                        return res.end(`Server Internal Error`);
                    }
                    // HTTP status code for redirection
                    res.statusCode = 302;
                    // redirect to /
                    res.setHeader('Location', '/');
                    // return to exit a function
                    return res.end(`Redirected to /`);
            });
            } catch (err) {
                console.log(`Failed to execute Async file I/O:\n${err}`);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Not Found</title></head>');
        res.write('<body><h1>Page Not Found</h1></body>');
        res.write('</html>');
        res.end(`Page Not Found`);
    }
};

// module.exports = requestHandler;

// shortcut version
// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';

// exporting key pairs
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}
