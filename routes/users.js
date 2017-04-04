var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
    models.User.create({
        username: req.body.username
    }).then(function() {
        res.redirect('/');
    });
});
router.get('/', function (req, res) {
    models.User.findAll({

    }).then(function(users) {
        res.send(users);
    });
});

router.get('/:id/', function (req, res) {
    models.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        res.send(user);
    });
});

router.get('/:user_id/destroy', function(req, res) {
    models.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

router.post('/:user_id/tasks/create', function (req, res) {
    models.Task.create({
        title: req.body.title,
        UserId: req.params.user_id
    }).then(function() {
        res.redirect('/');
    });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
    models.Task.destroy({
        where: {
            id: req.params.task_id
        }
    }).then(function() {
        res.redirect('/');
    });
});


module.exports = router;