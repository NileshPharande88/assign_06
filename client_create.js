try {
    var fs = require('fs');
    var http = require('http');
    var jsonReader = require("json-reader");
    if (fs === undefined) {
        throw new Error(" Can't access fs module.");
    }
    if (http === undefined) {
        throw new Error(" Can't access http module.");
    }
    if (jsonReader === undefined) {
        throw new Error(" Can't access jsonReader module.");
    }


    jsonReader.jsonObject("./sourceFiles/student.json", function studentReaderHandler(err, object) {
        if (err) {  //Throw an error if failed to read JSON file.
            throw err;
        }
        //Sends json object to the server.
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
            response.on('data', function onData(chunk) {
                chunks += chunk;  //Collecting data from chunks.
            });
            response.on('end', function onEnd() {  //Display the data on console
                if( chunks.search("Error") !== -1 ) {
                    console.log(chunks);
                } else {
                    var studentJSON = JSON.parse(chunks);
                    fs.writeFile("./sourceFiles/student.json", JSON.stringify(studentJSON), function(err) {
                        if (err) {  //return error if error occured in json file creation.
                            throw new Error(" Failed to create student.json.");
                        }
                        console.log("Successful to create student.json.");
                    });
                }
            });
        }


        var request = http.request(options, callback);
        //Send student.json file to the server.
        request.write( JSON.stringify(object), function (bSuccess) {
            if (bSuccess) {
                request.end();
                throw new Error(" student.json file not send.");
            } else {
                console.log("student.json file send.");
                request.end();
            }
        });
    });
    
} catch (err) {
    console.log(err);
}