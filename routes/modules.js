"use strict";

var models  = require('../models');

var express = require('express');
var router  = express.Router();
var validate = require('validate.js');

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3009', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('connected')
    //console.log('Connected to socket $s', socket.name);
});

socket.on('disconnect', function (socket) {
    console.log('disconnected');
});

router.get('/navigation', function(req, res) {

    models.Module.findAndCountAll({
            //attributes: ['id', 'name'],
            offset: 0,//start,
            limit: 100// limit //filter.limit
        }).then(function(modules) {


        res.send(modules);
        /*res.render('index', {
         title: 'Express',
         users: users
         });*/
    });
});


router.get('/navigation/admin/', function(req, res) {
    var parentId = 0
    if(req.param("node")){
        parentId = req.param("node");
    }


    models.Module.findAndCountAll({
        //attributes: ['id', 'name'],
        offset: 0,//start,
        limit: 100,// limit //filter.limit
        where: {
            parentId: parentId
        }
    }).then(function(modules) {

        res.send({
            children: modules.rows
        });

        //res.send(modules);
        /*res.render('index', {
         title: 'Express',
         users: users
         });*/
    });
});


router.get('/navigation/admin/:id', function(req, res) {
    var parentId = 0
    if(req.params.id === "root" ){
            parentId = 0;
    }

    models.Module.findAndCountAll({
        //attributes: ['id', 'name'],
        offset: 0,//start,
        limit: 100,// limit //filter.limit
        where: {
            parentId: parentId
        }
    }).then(function(modules) {

        res.send({
            name: ".",
            expanded: true,
            leaf:false,
            children: modules.rows
        });

        //res.send(modules);
        /*res.render('index', {
         title: 'Express',
         users: users
         });*/
    });
});

/*
router.get('/:id', function(req, res) {

    models.Customer.findOne({
        where :{
            id: req.params.id
        }
    }).then(function() {
        res.send();
    });
});
*/
router.post('/navigation/admin/', function(req, res) {
    req.body.id = parseInt(new Date().valueOf().toString().substr(0,9));



    models.Module.create(req.body)
        .then(function(module) {
           res.send(module);

        }).catch(function(err) {
            res.send(err);
        }
    );

});
/*
router.put('/:id', function(req, res) {
    models.Customer.update(req.body,
        {
            where: {
                id: req.params.id
            }})
        .then(function(customer) {
            models.Customer.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function (customer) {
                socket.emit('update customer', customer);
                res.send(customer);
            });


            //res.redirect('/');
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
});


router.delete('/:id', function(req,res){
    models.Customer.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    });
});
*/


module.exports = router;