try {
    var http = require('http');
    var jsonReader = require("json-reader");
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if ((jsonReader === undefined)) throw new Error( " Can't access json-reader module" );

    jsonReader.jsonObject("./sourceFiles/student.json", function ( err, object ) {
        if(err) {  //Throw an error if failed to read JSON file.
            console.log(err);
        } else {  //Sends json object to the server.

            var options = {
                host: '127.0.0.1',
                port: '1337',
                path: '/api/student',
                method: 'PUT',
                headers: {
                    'content-type': 'text/plain'
                }
            };//  'application/json' 'text/plain' 

            var callback = function(response) {
        //        var chunks;
                response.on('data', function (chunk) {
         //           chunks += chunk;
                    console.log('BODY: '+ chunk);
                });
         //       response.on('end', function () {
         //           console.log('BODY: ', chunks);
         //       });
            }


            var request = http.request(options, callback);
            request.write( JSON.stringify(object), function (bSuccess) {
                if(bSuccess) {
                    console.log("file not send.");
                    request.end();
                } else {
                    console.log("file send.");
                    request.end();
                }
            });
        }
    });
    
} catch (err) {
    console.log(err);
}