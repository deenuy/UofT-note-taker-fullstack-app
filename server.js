//Mounting express server and adding required libs
var express = require("express");
var PORT = process.env.PORT || 5001;

// Express server setup and listener 
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./routes/api')(app);
require('./routes/htmlRouting')(app);

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});