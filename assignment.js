const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    
    /*
    if (url === '/') {
        console.log(req.url, req.method, req.headers); // Log the request URL to the console
        res.statusCode = 200; // HTTP res status code
        // passing a header to res
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');        
        res.write('<title>Assignment 1</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>Hello!</h1>');
        res.write('</body>');
        res.write('</html>');
        
        // returning to stop subsequent code execution
        return res.end();
    }
    */

    if (url === '/users' && method === 'GET') {
        console.log(req.url, req.method, req.headers);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write(`<ul><li>User 1</li><li>User 2</li></ul>`);
        res.write('</html>');
        return res.end();
    }

    if (method === 'GET' && url === '/') {
        // Serve the HTML form when the root URL is accessed
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body>
                <form action="/create-user" method="POST">
                    <input type="text" name="username" placeholder="Enter username" required />
                        <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);
        return;
    }

    if (method === 'POST' && url === '/create-user') {
        // Handle the form submission
        const body = [];

        // for every chunk of data
        req.on('data', (chunk) => {
            // converting Buffer to String
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parse(parsedBody).username;
            console.log(`Username received: ${username}`);
            
            // Send a response back to client
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end(`User name received: ${username}`);
        });
    } 
    
    if (url !== '/users' && url !== '/' && !(method === 'POST' && url === '/create-user')) {
        // Handle any other URLs
        res.writeHead(404, { 'Content-Type': 'textplain' });
        res.end(`Page NOT found`);
    }
});

const port = 3008;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});