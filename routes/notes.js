const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');


note.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

note.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title, 
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {
        res.error('Error in adding note');
    }    
});

note.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete`);

        readAndDelete(req.params.id, './db/db.json');
        res.json(`Note removed successfully!`);
});

module.exports = note;