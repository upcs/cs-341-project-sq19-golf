const Fs = require('fs');

//Course Abstraction
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

//Extract file data
let data = Fs.readFileSync("../../web_scraper/course_dump.csv", "utf-8");
var lines = data.split("\n");

//Parse file data
let courses = lines.filter(line => line != '')
                   .map(line => {
  let fields = line.split(",");
  return new Course(fields[0].toUpperCase().trim(), fields[1].trim(), fields[2].trim(), fields[3].trim(), fields[4].toLowerCase().trim(), fields[5].toLowerCase().trim(), fields[6].toUpperCase().trim());
});
