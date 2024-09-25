const fs = require('node:fs/promises');

const filePath = './test.txt';

// Or const fs = require('fs').promises before v14.
async function example() {
    // Prepare to store a File Handler
    let fileHandler;

    try {
        // Step 1: Open the File
        fileHandler = await fs.open(filePath, 'r');
        console.log(`fileHandler.fd:\n${fileHandler.fd}`);
        console.log(`\n`);
        console.log(`await fileHandler.readFile( { encoding: 'utf-8' })`);
        console.log(await fileHandler.readFile( { encoding: 'utf-8' }));
    } catch (err) {
        // Catching any Errors during Opening of File
        console.log(`Error:\n${err}`);
    } finally {
        if (fileHandler) {
            // Step 3: Close File
            await fileHandler.close();
        }
    }
}

example();

/*
// Node < v14.
const fs = require('node:fs');
const util = require('node:util');

async function example() {
    const openFile = util.promisify(fs.open);
    const fileHandler = await open(filePath, 'r');
}

example();
*/