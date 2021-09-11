const notes = require("express").Router();
const { readFromFile, readAndAppend, readAndDelete } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

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

notes.delete('/:id', (req, res) => {

    const requestedId = req.params.id;

    console.log(requestedId);

    if (requestedId) {

        readAndDelete(requestedId, "./db/db.json");
        res.json("Note has been deleted successfully");
    } else {
        res.error("Error occured whiled deleting note");
    }
});

module.exports = notes;