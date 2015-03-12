try {
    var http = require("http");
    var fs = require('fs');
    var qs = require('querystring');
    var async = require("async");
    var jsonReader = require("json-reader");
    
    //Checks the required modules are available or not.
    if (http === undefined) throw new Error( " Can't access http module" );
    if (fs === undefined) throw new Error( " Can't access fs module" );
    if (qs === undefined) throw new Error( " Can't access qs module" );
    if (async === undefined) throw new Error( " Can't access async module" );
    if (jsonReader === undefined) throw new Error( " Can't access json-reader module" );


    //  Read all source files parallely.
    var readSourceFiles = function (cb) {
        async.parallel([
        	function (callback) {  //Reading students.json
                jsonReader.jsonObject("./sourceFiles/students.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read students.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function ( err, object ) {
                    if(err) {
                        console.log("Failed to read sub_5.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            }
        ],
        // optional callback 
        function(err, results){
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(new Error(" Can't read source json file."), null);
            } else {  //Returns array of json objects.
                return cb(null, results);
            }
        });//  async.parallel().
    }//  readSourceFiles(parallel).


    var server = http.createServer ( function (req, res) {
        var folderName = req.url.split('/')[1];  //devided url on base of "/".
        folderName = folderName.toLowerCase();  //Converte folder name to lower case.

        if ( folderName === "favicon.ico" ) {
            res.end();   //Avoid un necessory execution of code.
        } else {  //Checkes the requset type and call respective functions for performing CRUD operations.

            if ( req.method === 'PUT' ) {//  If received PUT request from client then create the record.
                var chunks = "";
                req.on('data', function (chunk) {
                    chunks += chunk;
                });
                req.on('end', function () {
                    var newStudent = JSON.parse(chunks);
                    readSourceFiles( function (err, jsonObjects) {
                        if (err) {  //send error message if fails to read source files.
                            console.log(err);
                            res.end("Error in reading resource json files.");
                        } else {
                            if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                                console.log("Error: Student element is not found in student.json.");
                                res.end("Student element is not found in student.json.");
                            } else {

                                var students = jsonObjects[0].students;
                                var isRecordPresent = true;
                                for (x in students) {  //Saparately access every students.
                                    if (students[x].email === newStudent.email) {
                                        console.log("Error: Student with the same email is already present.");
                                        res.end("Student with the same email is already present.");
                                        break;
                                    } else if (students[x].name === newStudent.name) {
                                        console.log("Error: Student with the same name is already present.");
                                        res.end("Student with the same name is already present.");
                                        break;
                                    } else {  //student is alrready not in record. So add a new record.
                                        isRecordPresent = false;
                                    }
                                }
                                if ( !isRecordPresent ) {
                                    console.log("Student is not already in record");
                                    ;
                                    ;
                                    res.end("PUT request.");
                                } 
                            }
                        }
                    });//  readSourceFiles().
                });//  req.on('end',).
            }//  if ( req.method === 'PUT' )
            //res.end("temp res.end().");

        }//  ( folderName === "favicon.ico" )
    });//  http.createServer().

    server.listen( 1337, "127.0.0.1", function() {
        console.log( "Listening on: 127.0.0.1: 1337" );
    });
} catch (err) {
    console.log(err);
}