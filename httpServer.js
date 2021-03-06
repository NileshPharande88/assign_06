try {
    var fs = require('fs');
    var url = require('url');
    var http = require("http");
    var async = require("async");
    var qs = require('querystring');
    var jsonReader = require("json-reader");
    
    //Checks the required modules are available or not.
    if (fs === undefined) {
        throw new Error(" Can't access fs module.");
    }
    if (url === undefined) {
        throw new Error(" Can't access url module.");
    }
    if (http === undefined) {
        throw new Error(" Can't access http module.");
    }
    if (async === undefined) {
        throw new Error(" Can't access async module.");
    }
    if (qs === undefined) {
        throw new Error(" Can't access querystring module.");
    }
    if (jsonReader === undefined) {
        throw new Error(" Can't access jsonReader module.");
    }


    //  Read all source files parallely.
    var readSourceFiles = function (cb) {
        async.parallel([
        	function (callback) {  //Reading students.json
                jsonReader.jsonObject("./sourceFiles/students.json", function studentsReader(err, object) {
                    if (err) {
                        console.log("Failed to read students.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_1.json
                jsonReader.jsonObject("./sourceFiles/sub_1.json", function subject1Reader(err, object) {
                    if (err) {
                        console.log("Failed to read sub_1.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_2.json
                jsonReader.jsonObject("./sourceFiles/sub_2.json", function subject2Reader(err, object) {
                    if (err) {
                        console.log("Failed to read sub_2.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_3.json
                jsonReader.jsonObject("./sourceFiles/sub_3.json", function subject3Reader(err, object) {
                    if (err) {
                        console.log("Failed to read sub_3.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_4.json
                jsonReader.jsonObject("./sourceFiles/sub_4.json", function subject4Reader(err, object) {
                    if (err) {
                        console.log("Failed to read sub_4.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            },
            function (callback) {  //Reading sub_5.json
                jsonReader.jsonObject("./sourceFiles/sub_5.json", function subject5Reader(err, object) {
                    if (err) {
                        console.log("Failed to read sub_5.json");
                        callback(err, null);
                    } else {
                        callback(err, object);
                    }
                });//jsonReader.
            }
        ],
        // optional callback 
        function parallelHandler(err, results) {
            if (err) {  //Returns an error if error occured in reading any of the subject files in json objects.
                return cb(new Error(" Can't read source json file."), null);
            }
            return cb(null, results);  ////Returns array of json objects.
        });//  async.parallel().
    }//  readSourceFiles(parallel).

    var writeSourceFiles = function (jsonObjects, cb) {
        async.parallel([
            function (callback) {  //writing students.json
                fs.writeFile("./sourceFiles/students.json", JSON.stringify(jsonObjects[0]), function studentsWriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create students.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "students.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_1.json
                fs.writeFile("./sourceFiles/sub_1.json", JSON.stringify(jsonObjects[1]), function sub_1WriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_1.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_1.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_2.json
                fs.writeFile("./sourceFiles/sub_2.json", JSON.stringify(jsonObjects[2]), function sub_2WriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_2.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_2.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_3.json
                fs.writeFile("./sourceFiles/sub_3.json", JSON.stringify(jsonObjects[3]), function sub_3WriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_3.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_3.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_4.json
                fs.writeFile("./sourceFiles/sub_4.json", JSON.stringify(jsonObjects[4]), function sub_4WriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_4.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_4.json is get created.");
                    }
                });
            },
            function (callback) {  //writing sub_5.json
                fs.writeFile("./sourceFiles/sub_5.json", JSON.stringify(jsonObjects[5]), function sub_5WriterHandler(err) {
                    if (err) {  //return error if error occured in json file creation.
                        callback(err, "Failed to create sub_5.json.");
                    } else {  //Return message of successful creation of json file.
                        callback(null, "sub_5.json is get created.");
                    }
                });
            }
        ],
        // optional callback 
        function parallelHandler(err, results) {
            if (err) {  //Returns an error if error occured in writing any of the subject files from json objects.
                return cb(err, null);
            }
            //Returns array of json objects.
            return cb(null, results);
        });//  async.parallel().
    }//  writeSourceFiles(parallel).

    //Search new student record in the array of source json files.
    var isRecordPresent = function (students, newStudent, callback) {
    	var isPresent = false;
        for (x in students) {  //Saparately access every students.
            if (students[x].email === newStudent.email) {
                console.log("Error: Student with the same email is already present.  ID: ", students[x].id);
                isPresent = true;
                break;
            } else if (students[x].name === newStudent.name) {
                console.log("Error: Student with the same name is already present.  ID: ", students[x].id);
                isPresent = true;
                break;
            }
        }
        return callback ( isPresent );
    }//  isRecordPresent().

    //Add records for a new students in sorces json objects and return the newStudent json object with the unique id.
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
        for (y in newStudent.enrolledSubjects) {
            var subjectIDFound = false;
            for (var x = 1; x < jsonObjects.length; x++) {  //access each subject json separately.
                if ( newStudent.enrolledSubjects[y].subjectId === jsonObjects[x].subjectId ) {
                    //If subject id found then add new record in same json.
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
                console.log("Subject id given by student is not found: ", newStudent.enrolledSubjects[y].subjectId);
            }
        }//added student's data in sub_x.json file's objects.

        //code to modify json files with modified json objects.
        writeSourceFiles(jsonObjects, function writeSourceFilesHandler(err, response) {
            if (err) {
                return callback(err, null);
            }
            newStudent.id = id;
            return callback(null, newStudent);
        });
    }//  addNewRecordtoJsonObjects().

    var createOperation = function (req, res, callback) {
        var chunks = "";
        req.on('data', function onData(chunk) {
            chunks += chunk;
        });
        req.on('end', function onEnd() {
            var newStudent = JSON.parse(chunks);
            readSourceFiles( function readSourceFilesHandler(err, jsonObjects) {
                if (err) {  //send error message if fails to read source files.
                    res.end("Error in reading resource json files.");
                    return callback(err, null);
                }
                if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                    res.end("Error: Student element is not found in students.json.");
                    return callback(new Error("Student element is not found in students.json."), null);
                }
                var students = jsonObjects[0].students;
                isRecordPresent(students, newStudent, function recordSearchHandler(response) {
                    if (response) {
                        res.end("Error: Student is already present.");
                        return callback(new Error( "Student is already present." ), null);
                    }
                    addNewRecordtoJsonObjects(newStudent, jsonObjects, function recordAddHandler(err, responseJSON) {
                        if (err) {
                            res.end("Error: Failed to create new record.");
                            return callback(err, null);
                        }
                        return callback(null, responseJSON);
                    });//  addNewRecordtoJsonObjects().
                });//  isRecordPresent().
            });//  readSourceFiles().
        });//  req.on('end',).
    }//  createOperation().


    var getResponseJSONById = function (id, res, jsonObjects, callback) {
        var students = jsonObjects[0].students;
        var index = -1;
        for (x in students) {  //Search for id sent by the client.
            if (students[x].id === id) {
                index = x;
                break;
            }
        }
        if (index === -1) {  //Throws if id not found in record.
            res.end("Error: Id not found in students record.");
            return callback(new Error( "Student element is not found in students.json." ), null);
        }
        var responseJSON = {};
        responseJSON.id = students[index].id;
        responseJSON.email = students[index].email;
        responseJSON.name = students[index].name;

        //Add record for enrolled subjects.
        responseJSON.enrolledSubjects = [];
        for (var x = 1; x < jsonObjects.length; x++) {  //access each subject json separately.
            if ( jsonObjects[x].enrolledStudents !== undefined ) {
                var enrolledStudents = jsonObjects[x].enrolledStudents;
                for (var y = 0; y < enrolledStudents.length; y++) {  //access each enrolledSubject from sub_x.json.
                    if ( enrolledStudents[y].id === responseJSON.id ) {
                        var tempSubject = {
                            "subjectId": jsonObjects[x].subjectId,
                            "subjectName": jsonObjects[x].subjectName
                        };  //Push enrolledSubject to array of responseJSON.
                        responseJSON.enrolledSubjects.push(tempSubject);
                        break;
                    } 
                }
            }
        }
        return callback(null, responseJSON);
    }  //getResponseJSONById().

    var readOperation = function (req, res, callback) {
        var path = url.parse(req.url).path;
        path = path.toLowerCase();
        var id = Number( path.split('{')[1].split("}")[0] );
        if ( isNaN(id) ) {
            res.end("Error: Entered id is not a number.");
            return callback(new Error( "Entered id is not a number." ), null);
        }
        readSourceFiles( function readSourceFilesHandler(err, jsonObjects) {
            if (err) {  //send error message if fails to read source files.
                res.end("Error in reading resource json files.");
                return callback(err, null);
            }
            if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                res.end("Error: Student element is not found in students.json.");
                return callback(new Error( "Student element is not found in students.json." ), null);
            }
            getResponseJSONById(id, res, jsonObjects, callback);
        });//  readSourceFiles().
    }//  readOperation().


    var getStudentJSONByIndex = function (index, jsonObjects, callback) {
        var studentJSON = {};
        var students = jsonObjects[0].students;
        studentJSON.id = students[index].id;
        studentJSON.email = students[index].email;
        studentJSON.name = students[index].name;

        //Add record for enrolled subjects.
        studentJSON.subjects = [];
        for (var x = 1; x < jsonObjects.length; x++) {  //access each subject json separately.
            if ( jsonObjects[x].enrolledStudents !== undefined ) {
                var enrolledStudents = jsonObjects[x].enrolledStudents;
                for (var y = 0; y < enrolledStudents.length; y++) {  //access each enrolledSubject from sub_x.json.
                    if ( enrolledStudents[y].id === studentJSON.id ) {
                        var tempSubject = {
                            "subjectId": jsonObjects[x].subjectId,
                            "subjectName": jsonObjects[x].subjectName,
                            "score": enrolledStudents[y].score
                        };  //Push enrolledSubject to array of responseJSON.
                        studentJSON.subjects.push(tempSubject);
                        break;
                    } 
                }
            }
        }
        return callback(null, studentJSON);
    }  //getStudentJSONByIndex().

    var readListOperation = function (req, res, callback) {
        readSourceFiles( function readSourceFilesHandler(err, jsonObjects) {
            if (err) {  //send error message if fails to read source files.
                res.end("Error in reading resource json files.");
                return callback(err, null);
            }
            if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                res.end("Error: Student element is not found in students.json.");
                return callback(new Error( "Student element is not found in students.json." ), null);
            }
            var responseJSON = {};
            responseJSON.students = [];
            for (x in jsonObjects[0].students) {
                getStudentJSONByIndex(x, jsonObjects, function getStudentByIndexHandler(err, studentJSON) {
                    responseJSON.students.push( studentJSON );
                    if(Number(x) === (jsonObjects[0].students.length - 1) ) {  //return responseJSON
                        return callback(null, responseJSON);
                    }
                });//  getResponseJSONByIndex().
            }
        })//  readSourceFiles().
    }  //readListOperation().


    var modifyStudentRecordById = function (id, req, res, jsonObjects, callback) {
        var students = jsonObjects[0].students;
        var index = -1;
        for (x in students) {  //Search for student id sent by the client inside students.json.
            if (students[x].id === id) {
                index = x;
                break;
            }
        }
        if (index === -1) {  //Throws if id not found in record.
            res.end("Error: Id not found in students record.");
            return callback(new Error( "Student element is not found in students.json." ), null);
        }
        //start to form modify student record from source files.
        var chunks = "";
        req.on('data', function onDate(chunk) {
            chunks += chunk;
        });
        req.on('end', function onEnd() {
            var newStudent = JSON.parse(chunks);  //Parse the incoming json from request.
            jsonObjects[0].students[index].id = Number( newStudent.id );
            jsonObjects[0].students[index].email = newStudent.email;
            jsonObjects[0].students[index].name = newStudent.name;

            for (z in newStudent.enrolledSubjects) {  //access each subject from the new student separately
                for (var x = 1; x < jsonObjects.length; x++) {  //access each source subject.json separately.
                    if (jsonObjects[x].subjectId === newStudent.enrolledSubjects[z].subjectId) {  //matches the subject id.
                        var enrolledStudents = jsonObjects[x].enrolledStudents;
                        for (var y = 0; y < enrolledStudents.length; y++) {  //Access student record from subject.json
                            if (enrolledStudents[y].id === id) {  //matches the student id inside subject.json.
                                jsonObjects[x].enrolledStudents[y].id = Number( newStudent.id );
                                jsonObjects[x].enrolledStudents[y].score = 111;
                                break;
                            }
                        }//Access student record from subject.json
                    }
                }//access each source subject.json separately.
            }//access each subject from the new student separately
            writeSourceFiles(jsonObjects, function writeSourceFilesHandler(err, response) {
                if (err) {
                    res.end("Error: Failed to write json objects to the file.json.");
                    return callback(err, null);
                }
                return callback(null, newStudent);
            });
        });//  req.on('end',).
    }  //modifyStudentRecordById().

    var updateOperation = function (req, res, callback) {
        var path = url.parse(req.url).path;
        path = path.toLowerCase();
        var id = Number( path.split('{')[1].split("}")[0] );
        if ( isNaN(id) ) {
            res.end("Error: Entered id is not a number.");
            return callback(new Error( "Entered id is not a number." ), null);
        }
        readSourceFiles( function readSourceFilesHandler(err, jsonObjects) {
            if (err) {  //send error message if fails to read source files.
                res.end("Error in reading resource json files.");
                return callback(err, null);
            }
            //Successful to read source json files.
            if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                res.end("Error: Student element is not found in students.json.");
                return callback(new Error( "Student element is not found in students.json." ), null);
            }
            return modifyStudentRecordById(id, req, res, jsonObjects, callback);
        });//  readSourceFiles().
    }  //updateOperation().


    var deleteResponseJSONById = function (id, res, jsonObjects, callback) {
        var students = jsonObjects[0].students;
        var index = -1;
        for (x in students) {  //Search for id sent by the client.
            if (students[x].id === id) {
                index = x;
                break;
            }
        }
        if (index === -1) {  //Throws if id not found in record.
            res.end("Error: Id not found in students record.");
            return callback(new Error( "Student element is not found in students.json." ), null);
        }
        //start to delete records from source files.
        jsonObjects[0].students.splice(index, 1);

        //Delete record for enrolled subjects.
        for (var x = 1; x < jsonObjects.length; x++) {  //access each subject json separately.
            if ( jsonObjects[x].enrolledStudents !== undefined ) {
                var enrolledStudents = jsonObjects[x].enrolledStudents;
                for (var y = 0; y < enrolledStudents.length; y++) {  //access each enrolledSubject from sub_x.json.
                    if ( enrolledStudents[y].id === id ) {
                        jsonObjects[x].enrolledStudents.splice(y, 1);
                        break;
                    } 
                }
            }
        }
        writeSourceFiles(jsonObjects, function writeSourceFilesHandler(err, response) {
            if (err) 
                res.end("Error: Failed to write json objects to the file.json.");
                return callback(err, null);
            }
            return callback(null, id);c
        });
    }//deleteResponseJSONById().

    var deleteOperation = function (req, res, callback) {
        var path = url.parse(req.url).path;
        path = path.toLowerCase();
        var id = Number( path.split('{')[1].split("}")[0] );
        if ( isNaN(id) ) {
            res.end("Error: Entered id is not a number.");
            return callback(new Error( "Entered id is not a number." ), null);
        }
        readSourceFiles( function readSourceFilesHandler(err, jsonObjects) {
            if (err) {  //send error message if fails to read source files.
                res.end("Error in reading resource json files.");
                return callback(err, null);
            }
            //Successful to read source json files.
            if (jsonObjects[0].students === undefined ) {  //sends error message if Student element is not found in student.json.
                res.end("Error: Student element is not found in students.json.");
                return callback(new Error( "Student element is not found in students.json." ), null);
            }
            return deleteResponseJSONById(id, res, jsonObjects, callback);
        });//readSourceFiles().
    }//deleteOperation().


    var server = http.createServer ( function serverHandler(req, res) {
        var path = url.parse(req.url).path;
        path = path.toLowerCase();  //Converte path to lowercase.
        if ( path === "favicon.ico" ) {
            res.end();   //Avoid un necessory execution of code.
        } else {  //Checkes the requset type and call respective functions for performing CRUD operations.
            if ( req.method === 'PUT' ) {//  If received PUT request from client then create the record.
                if ( path !== "/api/student" ) {
                    res.end("Error: Wrong url entered.");
                    throw new Error(" Wrong url entered.");
                }
                //Perform create operation.
                createOperation(req, res, function creatorHandler(err, responseJSON) {
                    if (err) {
                        throw err;
                    }
                    //Returns the created record as json object with id to the client.
                    console.log("Successful to create record.");
                    res.writeHead(200, {'Content-Type': 'application/json' });
                    res.end( JSON.stringify(responseJSON) );
                });//  createOperation().
            } else if ( req.method === 'GET' ) {//  If received GET request from client then read the record.
                if ( path.search("/api/student/") !== -1 ) {  //Perform read operation.
                    readOperation(req, res, function readrHandler(err, responseJSON) {
                        if (err) {
                            throw err;
                        }
                        //Returns the readed record as json object to the client.
                        console.log("Successful to read record.");
                        res.writeHead(200, {'Content-Type': 'application/json' });
                        res.end( JSON.stringify(responseJSON) );
                    });  //readOperation().
                } else if ( path.search("/api/students/") !== -1 ) {  //Perform read/List operation.
                    readListOperation(req, res, function readListHandler(err, responseJSON) {
                        if (err) {
                            throw err;
                        }
                        //Returns the readed records as json object to the client.
                        console.log("Successful to read all records.");
                        res.writeHead(200, {'Content-Type': 'application/json' });
                        res.end( JSON.stringify(responseJSON) );
                    });//  readListOperation().
                } else {
                    console.log("Error: Wrong url entered.");
                    res.end("Error: Wrong url entered.");
                }
                //if ( req.method === 'GET' ).
            } else if ( req.method === 'POST' ) {//  If received POST request from client then update the record.
                if ( path.search("/api/student/") === -1 ) {
                    res.end("Error: Wrong url entered.");
                     throw new Error(" Wrong url entered.");
                }
                //Perform update operation.
                updateOperation(req, res, function updateHandler(err, responseJSON) {
                    if (err) {  //Wrotes an error if update record was failed.
                        throw err;
                    }
                    //Returns the updated record as json object with id to the client.
                    console.log("Successful to update record.");
                    res.writeHead(200, {'Content-Type': 'application/json' });
                    res.end( JSON.stringify(responseJSON) );
                });//  updateOperation().
            } else if ( req.method === 'DELETE' ) {//  If received POST request from client then update the record.
                if ( path.search("/api/student/") === -1 ) {
                    res.end("Error: Wrong url entered.");
                    throw new Error(" Wrong url entered.");
                }
                //Perform update operation.
                deleteOperation(req, res, function deleteHandler(err, responseId) {
                    if (err) {
                        throw err;
                    }
                    //Returns the id of deleted record as json object to the client.
                    console.log("Successful to delete record.");
                    res.writeHead(200, {'Content-Type': 'application/json' });
                    var tempJSON = {
                        "id": responseId
                    }
                    res.end( JSON.stringify(tempJSON) );
                });//  deleteOperation().
            } else {
                console.log("Error: Unknown request meentod.");
                res.end("Error: Unknown request meentod.");
            }
            //res.end("temp res.end().");
        }  //( folderName === "favicon.ico" )
    });  //http.createServer().

    server.listen( 1337, "127.0.0.1", function listenerHandler() {
        console.log("Listening on: 127.0.0.1: 1337");
    });
} catch (err) {
    console.log(err);
}