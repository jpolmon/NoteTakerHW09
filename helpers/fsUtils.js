const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (toDelete, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        const parsedData = JSON.parse(data);
        let itemToDelete = parsedData.find( note => note.id == toDelete);
        let index = parsedData.indexOf(itemToDelete)
        console.log(parsedData);
        parsedData.splice(index, 1);
        writeToFile(file, parsedData);
        }
    });
}; 

module.exports = { readFromFile, readAndAppend, readAndDelete };