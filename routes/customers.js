var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
    models.Customer.findAndCountAll({ limit: 2 }).then(function(customers) {
        res.send(customers)
        /*res.render('index', {
         title: 'Express',
         users: users
         });*/
    });
});


router.get('/:id', function(req, res) {

    models.Customer.destroy({
        where :{
            id: req.params.id
        }
    }).then(function() {
        res.send();
    });
});

router.post('/', function(req, res) {
    /*models.Customer.create({
        clientId: req.body.clientId,
        id: req.body.id,
        name: req.body.name
    }).then(function(customer) {
        res.send(customer);
        //res.redirect('/');
    });*/

    models.Customer.create(req.body)
        .then(function(customer) {
            //res.send(customer);
            res.redirect('/');
        }).catch(function(err) {
            res.send(err);
        }
    );

});

router.get('/:id/destroy', function(req,res){
    models.Customer.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    });
})


router.delete('/:id', function(req,res){
    models.Customer.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    });
})









module.exports = router;