
var express = require('express');
var routeConfig = require('./app/routes/routes.json')


var router = express.Router();

for(var item in routeConfig.routes){
    console.log(item)

    var routeItem = routeConfig.routes[item];




}

var app = express();
var router = express.Router();

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// customizing the behavior of router.param()
/*
router.param(function(param, option) {
    return function (req, res, next, val) {
        if (val == option) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
});
*/
// using the customized router.param()
//router.param('id', 1337);

// route to trigger the capture
router.get('/user/:id', function (req, res) {
    res.send('OK');
});

app.use("/api", router);

app.listen(3000, function () {
    console.log('Ready');
});

