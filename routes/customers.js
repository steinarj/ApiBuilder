"use strict";

var models  = require('../models');

var express = require('express');
var router  = express.Router();
var validate = require('validate.js');

var io = require('socket.io-client');
//var socket = io.connect('http://sockettest.api.24sevenoffice.com', {reconnect: true});
var socket = io.connect('http://localhost:3009', {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('connected')
    //console.log('Connected to socket $s', socket.name);
});

socket.on('disconnect', function (socket) {
    console.log('disconnected')
    //console.log('Disconnected ffrom socket $s', socket.name);
});
///socket.emit('CH01', 'me', 'test msg');


//var filters = require('../filters');

router.get('/', function(req, res) {
/*
    if(req.query.filter){
        var filter = req.query.filter;
        if(typeof filter === 'string')
            filter = JSON.parse(filter);
        
        var isFilterOK = validate(filter, filters.Customer);

        if(typeof isFilterOK == 'object' )
            //throw new Error({code: 500, message: isFilterOK })
            res.send(isFilterOK);
        return;
    }*/
    var start  = parseInt(req.query.start);
    var limit  = parseInt(req.query.limit);

    models.Customer.findAndCountAll({
        //attributes: ['id', 'name'],
        offset: 0,//start,
        limit: 50// limit //filter.limit
        }
        /*{ limit: 50 }*/).then(function(customers) {
        
        res.send(customers);
        /*res.render('index', {
         title: 'Express',
         users: users
         });*/
    });
});


router.get('/:id', function(req, res) {

    models.Customer.findOne({
        where :{
            id: req.params.id
        }
    }).then(function() {
        res.send();
    });
});

router.post('/', function(req, res) {

    models.Customer.create(req.body)
        .then(function() {
            //res.send(customer);
            res.redirect('/');
        }).catch(function(err) {
            res.send(err);
        }
    );

});

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


module.exports = router;