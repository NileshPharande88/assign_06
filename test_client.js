try {
    var http = require('http');
    var jsonReader = require("json-reader");
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );


    var options = {
        host: '127.0.0.1',
        port: '1337',
        path: '/api/student',
        method: 'PUT',
        headers: {'accept': 'text/plain'}
//        headers: {'accept': 'application/json'}
    };

    var callback = function(response) {
        console.log("Status code: ", response.statusCode);
        console.log("Status: ", response.statusMessage);
        var chunks;
        response.on('data', function (chunk) {
 //           chunks += chunk;
            console.log('BODY: '+ chunk);
        });
 //       response.on('end', function () {
 //           console.log('BODY: ', chunks);
 //       });
    }


    jsonReader.jsonObject("./sourceFiles/students.json", function ( err, object ) {
        if(err) {  //Throw an error if failed to read JSON file.
            console.log(err);
        } else {
            var request = http.request(options, callback);
            request.write( JSON.stringify(object) );
            request.end();
        }
    });
} catch (err) {
    console.log(err);
}