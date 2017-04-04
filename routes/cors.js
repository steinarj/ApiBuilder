var cors = function(req, res, next) {
    // IE9 doesn't set headers for cross-domain ajax requests
    var env = process.env.NODE_ENV || "development";


    if(typeof(req.headers['content-type']) === 'undefined'){
        req.headers['content-type'] = "application/json; charset=UTF-8";
    }

    var allowedOrigins = ['http://localhost:1841']
    var origin = req.headers.origin;
    var headers = {};

    if(allowedOrigins.indexOf(origin) > -1){
        req.headers['Access-Control-Allow-Origin'] = origin;

        if(env === "development") {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-tfso-license');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    if(env === "development") {
        res.setHeader('Access-Control-Allow-Credentials', true);
    }


    if ( req.method === 'OPTIONS' ) {
        headers["Access-Control-Max-Age"] = '86400';
        res.writeHead(200, headers);
        res.end();
    }
    else {
        next();
    }

};

module.exports = cors;