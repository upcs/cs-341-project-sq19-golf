
//class declaration for course Object
class Course {
    constructor(sub, id, name, prof, start, end, d){
        this.subject = sub;
        this.courseID = id;
        this.courseName = name;
        this.professor = prof;
        this.timeStart = start;
        this.timeEnd = end;
        this.days = d;
    }
}

var fs = require('fs');
//read file and store in variable *data
var data = fs.readFileSync("./inputFile.txt", "utf-8");
//store each line of file into an element of the array respectively
var dataByLine = data.split("\n");
//assign variable *lines as an array
var lines = dataByLine;
//assign variable *courses as an array of type Course class Objects
var courses = new Array(Course);
var i;
//iterate through *lines
for(i = 0; i < lines.length; i++) {
    //for each element of *courses store a Course Object from an element of *lines, respectively
    var fields = lines[i].split(",");
    courses[i] = new Course(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6]);
}
var jsondata = [];
for(var x = 0; x < courses.length; x++){
  jsondata.push(JSON.stringify(courses[i]));
}

//write array of Course objects into file
fs.writeFile('outputFile.txt', jsondata);
