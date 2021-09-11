const notes = require("express").Router();
const { readFromFile, readAndAppend, readAndDelete } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// Returns the db.json file
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Create a new note and adds it to the existing db.json file
notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note has been added successfully");
    } else {
        res.error("Error occured while adding note");
    }
});

// Handles the delete method by passing the id parameter to the readAndDelete method
notes.delete('/:id', (req, res) => {

    const requestedId = req.params.id;

    if (requestedId) {

        readAndDelete(requestedId, "./db/db.json");
        res.json("Note has been deleted successfully");
    } else {
        res.error("Error occured whiled deleting note");
    }
});

module.exports = notes;