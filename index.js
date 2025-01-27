var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

const { addMovie} = require('./utils/MovieUilAlz');
app.post('/add-resource', addMovie);

const {  editMovie } = require('./utils/MovieUilFaraan');
app.put('/edit-movie/:id', editMovie);

const { viewResources } = require('./utils/MovieUilFir');
app.get('/view-resource/:search', viewResources);


server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});

module.exports = {app, server,}
