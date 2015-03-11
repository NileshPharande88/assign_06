try {
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var url = require('url');
    
    //Checks the required modules are available or not.
    if (http === undefined) throw new Error( " Can't access http module" );
    if (fs === undefined) throw new Error( " Can't access fs module" );
    if (qs === undefined) throw new Error( " Can't access qs module" );
    if (url === undefined) throw new Error( " Can't access url module" );

    var server = http.createServer ( function (req, res) {
        var folderName = req.url.split('/')[1];  //devided url on base of "/".
        folderName = folderName.toLowerCase();  //Converte folder name to lower case.
        if ( folderName === "favicon.ico" ) {
            res.end("test");   //Avoid un necessory execution of code.
        } else {  //Checkes the requseted types and call respective functions.
            if ( req.method === 'GET' ) {
                res.end("GET request.");
            } else if ( req.method === 'PUT' ) {
            	;
            	;
            	//var queryObject = url.parse(req.url,true).query;
//            	var chunks;
            	req.on('data', function (chunk) {
//            		chunks += chunk;
            		console.log('BODY: '+ chunk);
            	});
                res.end("PUT request.");
            }
        }
    });

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (err) {
    console.log(err);
}