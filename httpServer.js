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


    var writeSourceFiles = function (jsonObjects, cb) {
        async.parallel([
            function (callback) {  //writing students.json
                fs.writeFile("./sourceFiles/students.json", JSON.stringify(jsonObjects[0]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create students.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "students.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_1.json
                fs.writeFile("./sourceFiles/sub_1.json", JSON.stringify(jsonObjects[1]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_1.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_1.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_2.json
                fs.writeFile("./sourceFiles/sub_2.json", JSON.stringify(jsonObjects[2]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_2.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_2.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_3.json
                fs.writeFile("./sourceFiles/sub_3.json", JSON.stringify(jsonObjects[3]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_3.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_3.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_4.json
                fs.writeFile("./sourceFiles/sub_4.json", JSON.stringify(jsonObjects[4]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_4.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_4.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_5.json
                fs.writeFile("./sourceFiles/sub_5.json", JSON.stringify(jsonObjects[5]), function(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_5.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_5.json is get created.");
                    }
                });
            }
        ],
        // optional callback 
        function(err, results){
            if (err) {  //Returns an error if error occured in writing any of the subject files from json objects.
                return cb(err, null);
            } else {  //Returns array of json objects.
                return cb(null, results);
            }
        });//  async.parallel().
    }//  writeSourceFiles(parallel).


    var isRecordPresent = function (students, newStudent, callback) {
    	var isPresent = false;
        for (x in students) {  //Saparately access every students.
            if (students[x].email === newStudent.email) {
                console.log("Error: Student with the same email is already present.  ID: ", students[x].id );
                isPresent = true;
                break;
            } else if (students[x].name === newStudent.name) {
                console.log("Error: Student with the same name is already present.  ID: ", students[x].id );
                isPresent = true;
                break;
            }
        }
        return callback ( isPresent );
    }//  isRecordPresent().


    var addNewRecordtoJsonObjects = function (newStudent, jsonObjects, callback) {
        //Created new entry in students.json's object.
        var tempStudents = jsonObjects[0].students;
        var id = 1;
        for (var x = 0; x < tempStudents.length; x++) {
            if ( id === tempStudents[x].id ) {
                id++;
                x = -1;
            }
        }
        tempStudents[0].id = id;
        tempStudents[0].email = newStudent.email;
        tempStudents[0].name = newStudent.name;
        jsonObjects[0].students.push( tempStudents[0] );
        //Created new entry in students.json's object.

        //add student's data in sub_x.json file's objects.
        newStudent.enrolledSubjects.forEach( function (subject) {  //access each subject id from new student record. 
            var subjectIDFound = false;
            for (var x = 1; x < jsonObjects.length; x++) {  //access each subject json separately.
                if ( subject.subjectId === jsonObjects[x].subjectId ) {  //If subject id found then add new record in same json.
                    subjectIDFound = true;
                    var tempjson = {
                        "id": id,
                        "score": 111
                    };
                    jsonObjects[x].enrolledStudents.push(tempjson);
                    break;
                }  //add new record in same json
            }
            if (!subjectIDFound) {  //as ubject with given idis not found, throw error message.
                console.log("Subject id given by student is not found: ", subject.subjectId);
            }
        });//added student's data in sub_x.json file's objects.

        //code to modify json files with modified json objects.
        writeSourceFiles(jsonObjects, function (err,response) {
            if (err) {
                return callback(err, null);
            } else {
                console.log("Modified files: ",response.length);
                newStudent.id = id;
                return callback(null, newStudent);
            }
        });
    }


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
                                res.end("Error: Student element is not found in student.json.");
                            } else {
                                var students = jsonObjects[0].students;
                                isRecordPresent(students, newStudent, function (response) {
                                    if (response) {
                                        res.end("Error: Student is already present.");
                                    } else {
                                        addNewRecordtoJsonObjects(newStudent, jsonObjects, function (err, responseJSON) {
                                            if (err) {
                                                console.log(err);
                                                res.end("Error: Failed to create new record.");
                                            } else {
                                                console.log("responseJSON : ", JSON.stringify(responseJSON) );
                                                res.end( JSON.stringify(responseJSON) );
                                            }
	                                    });//  addNewRecordtoJsonObjects().
                                    }
                                });//  isRecordPresent().
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