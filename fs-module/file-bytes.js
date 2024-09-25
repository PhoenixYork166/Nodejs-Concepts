const fs = require('fs');

// Assign the Best Practice of a reliable Buffer
// Over a Web Socket = 1024 bytes
const buffer = Buffer.alloc(1024);

const file = './test.txt';

// Step 1: Open the File
fs.open(file, 'r', (err, fd) => {
    if (err) {
        console.error(`Error opening file: ${err}`);
        return;
    }

    // Step 2: Read from the File
    fs.read(fd, buffer, 0, buffer.length, null, (err, numBytes) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
        console.log(`Number of bytes read:\n${numBytes}`);
        console.log(`Data read:\n${buffer.slice(0, numBytes).toString()}`);

        // Step 3: Close the File
        fs.close(fd, (err) => {
            if (err) {
                console.error(`Error closing file: ${err}`);
                return;
            }
            console.log(`File successfully closed`);
        });
    });
});
