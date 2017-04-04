
var express = require('express');
var cassandra = require('cassandra-driver');

var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route to trigger the capture


app.use("/api", router);

app.listen(3001, function () {
    console.log('Ready');
});

