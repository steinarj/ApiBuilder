
var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.User.findAll({
        include: [ models.Task ]
    }).then(function(users) {

        models.Customer.findAll().then(function(customers) {

            res.render('index', {
                title: 'Express',
                users: users,
                customers: customers
            });
        });



    });
});

router.get('/test', function(req, res) {
    var fs = require('fs');
    var index = fs.readFileSync('./views/index2.html');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);


});

module.exports = router;