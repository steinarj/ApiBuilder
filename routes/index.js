
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

module.exports = router;