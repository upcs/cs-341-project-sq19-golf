
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
var data = fs.readFileSync("./inputFileTest.txt", "utf-8");
//store each line of file into an element of the array respectively
var dataByLine = data.split("\n");
//assign variable *lines as an array
var lines = dataByLine;
//assign variable *courses as an array of type Course class Objects
var courses = new Array(Course);
var i;
//iterate through *lines
for(i = 0; i < lines.length-1; i++) {
    //for each element of *courses store a Course Object from an element of *lines, respectively
    var fields = lines[i].split(",");
    //console.log(fields);
    courses[i] = new Course(fields[0].toUpperCase().trim(), fields[1].trim(), fields[2].trim(), fields[3].trim(), fields[4].toLowerCase().trim(), fields[5].toLowerCase().trim(), fields[6].toUpperCase().trim());

}
//console.log(courses);

//write array of Course objects into file
fs.writeFileSync('outputFileTest.txt', JSON.stringify(courses));
