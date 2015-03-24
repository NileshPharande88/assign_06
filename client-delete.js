try {
    var fs = require('fs');
    var http = require('http');
    if (fs === undefined) {
        throw new Error(" Can't access fs module.");
    }
    if (http === undefined) {
        throw new Error(" Can't access http module.");
    }

    var options = {
        host: '127.0.0.1',
        path: '/api/student/{' +process.argv.slice(2)[0]+ '}',
        port: '1337',
        method: 'DELETE',
//        headers: {'accept': 'text/plain'}
        headers: {'accept': 'application/json'}
    }

    var chunks = "";
    var callback = function(response) {
        response.on('data', function onData(chunk) {
            chunks += chunk;
        });
        response.on('end', function onEnd() {  //Display the data on console
            if( chunks.search("Error") !== -1 ) {
                console.log(chunks);
            } else {
                var studentJSON = JSON.parse(chunks);
                fs.writeFile("./sourceFiles/studentId.json", JSON.stringify(studentJSON), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        console.log("Failed to create student.json.");
                    } else {  //Return message of successful creation of json file.
                    	console.log("Successful to create student.json.");
                    }
                });
            }
        });
    }

    http.request(options, callback).end();
} catch (err) {
    console.log(err);
}