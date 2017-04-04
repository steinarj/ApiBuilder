#!/usr/bin/env node

var debug = require('debug')('express-example');
var app = require('../app');
var models = require("../models");

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
    var length = 10000;
    var start = 5000;
    //addData(start, length);

    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
});

function addData(start, total){
    if(start < total){
        models.Customer.create({clientId: 99999999999900, id: start, name: 'IBM Inc', companyType:1 }).then(function () {
            addData(start + 1, total);
        });
    }
}