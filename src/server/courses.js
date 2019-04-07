const Fs = require('fs');

//Course Abstraction
class Course {
    constructor(sub, id, section, title, crn, start, end, d, prof, loc, cred){
        this.subject = sub;
        this.number = id;
		this.section = section;
        this.title = title;
		this.crn = crn;
        this.start = start;
        this.end = end;
        this.days = d;
		this.professor = prof;
		this.location = loc;
		this.credits = cred;
    }
}

module.exports = {
  parseCourseData: (filePath) => {
    //Extract file data
    let data = Fs.readFileSync(filePath, "utf-8");
    var lines = data.split("\n");

    //Parse file data
    let courses = lines.filter(line => line != '')
                       .map(line => {
      let fields = line.split(",");
      return new Course(fields[0].toUpperCase().trim(), fields[1].trim(), fields[2].trim(), fields[3].trim(), fields[4].toLowerCase().trim(), fields[5].toLowerCase().trim(), fields[6].toUpperCase().trim());
    });

    return courses;
  }
}