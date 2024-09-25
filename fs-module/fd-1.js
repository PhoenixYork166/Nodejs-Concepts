const fs = require('node:fs');
const path = require('node:path');

// Correctly specify the path to the file
const filePath = path.join(__dirname, 'test.txt');

fs.open(filePath, 'r', (err, fd) => {
    if (err) {
        console.error(`Error opening file: ${err}`);
        // Ensure to return to avoid further execution
        // in case of error
        return;
    }
    
    console.log(`File Descriptor: ${fd}`);

    // Make sure to close the file descriptor
    fs.close(fd, (err) => {
        if (err) {
            console.error(`Error closing file: ${err}`);
        }
    });
});