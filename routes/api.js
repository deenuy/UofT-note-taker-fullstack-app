var path = require("path");
var fs = require("fs");

const routes = (app) => {
    var dbFile = path.join(__dirname, "../db/db.json"); //Temporary storage for data persistence
    var notes = []; //Array of objects for notes

    // Get notes from db.json local storage file
    try {
        notes = JSON.parse(fs.readFileSync(dbFile));
    } catch (error) {
        console.log(error.message);
    }

    //Backend server APIs

    // GET Notes
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    // GET notes by ID
    app.get("/api/notes/:id", function(req, res) {
        var noteId = req.params.id;
        notes = notes.filter((element) => { return (element.id === noteId) });
        res.json(notes);
    });

    // POST to add notes
    app.post("/api/notes", function(req, res) {
        var addNote = req.body;
        // console.log(addNote);
        addNote.id = notes.length + 1;
        notes.push(addNote);
        fs.writeFileSync(dbFile, JSON.stringify(notes));
        res.json(notes);
    });

    // DELETE notes
    app.delete("/api/notes/:id", function(req, res) {
        var noteId = req.params.id;
        notes = notes.filter((element) => { return (element.id != noteId) });
        fs.writeFileSync(dbFile, JSON.stringify(notes));
        res.json(notes);
    });
}

module.exports = routes;