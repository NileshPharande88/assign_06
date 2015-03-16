try {
    var http = require('http');
    var fs = require('fs');
    var jsonReader = require("json-reader");
    if ((http === undefined)) throw new Error( " Can't access http module" );
    if (fs === undefined) throw new Error( " Can't access fs module" );
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
                var chunks = "";
                response.on('data', function (chunk) { //Collecting data from chunks.
                    chunks += chunk;
                });
                response.on('end', function () {  //Display the data on console
                    if( chunks.search("Error") !== -1 ) {
                        console.log(chunks);
                    } else {
                        var studentJSON = JSON.parse(chunks);
                        fs.writeFile("./sourceFiles/student.json", JSON.stringify(studentJSON), function(err) {
                            if (err) {  //return error if error occured in json file creation.
                                console.log("Failed to create student.json.");
                            } else {  //Return message of successful creation of json file.
                                console.log("Successful to create student.json.");
                            }
                        });
                    }
                });
            }


            var request = http.request(options, callback);
            //Send student.json file to the server.
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