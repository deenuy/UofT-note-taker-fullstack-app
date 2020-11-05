//Mounting express server and adding required libs
var express = require("express");
var PORT = process.env.PORT || 8081;
var path = require("path");
var fs = require("fs");
var dbFile = path.join(__dirname, "/db/db.json"); //Temporary storage for data persistence
var notes = []; //Array of objects for notes

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

// Get notes from db.json local storage file
try {
    notes = JSON.parse(fs.readFileSync(dbFile));
} catch (error) {
    console.log(error.message);
}

// Client screen routings
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//Backend server APIs

// GET Notes
app.get("/api/notes", function(req, res) {
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