# UofT-note-taker-fullstack-app
The note taker is a web application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

## User story
AS A user, I want to be able to write and save notes
I WANT to be able to delete notes I've written before
SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Server APIs
* /api/notes (GET) - to list the notes from db json storage file
* /api/notes/id (GET) - to get the note item of selected ID
* /api/notes (POST) - to add a new note and save to db json storage file

## Technology Stack
* HTML, CSS, Bootstrap
* Javascript
* nodejs, express