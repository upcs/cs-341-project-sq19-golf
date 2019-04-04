/*const Fs = require('fs');

//Course Abstraction
class Course {
    constructor(sub, id, name, prof, start, end, d){
        this.subject = sub;
        this.number = id;
        this.title = name;
        this.professor = prof;
        this.start = start;
        this.end = end;
        this.days = d;
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
*/
const Fs = require('fs');

//Course Abstraction
class Course {
    constructor(sub, id, name, prof, start, end, d){
        this.subject = sub;
        this.number = id;
        this.title = name;
        this.professor = prof;
        this.start = ampm(start) + ":" + start.split(":")[1];
        this.end = ampm(end) + ":" + end.split(":")[1];
        this.days = d;
		//availability mask initialized to 0 => all available by default
		this.mask = ["0".repeat(168), "0".repeat(168), "0".repeat(168), "0".repeat(168), "0".repeat(168)] ;
		//each course's mask reflects the time gaps that the course takes
		this.mask = maskWeek(this, this.mask);
		//count the total number of 1s in the mask at object instantiation time : compute only once and avoid doing it later to compare viability of a full schedule
		this.ones = [countOnes(this.mask[0]), countOnes(this.mask[1]), countOnes(this.mask[2]), countOnes(this.mask[3]), countOnes(this.mask[4])];

    }
}

function ampm(time){
		//Add 12 to hour if it's PM -> makes it easier to handle schedule binary array representation
		var hour = time.split(":")[0];
		var minute = time.split(":")[1];
		var ap = minute.split(" ")[1];
		minute = minute.split(" ")[0];
		if (ap.localeCompare("pm") == 0){
			hour = (parseInt(hour) + 12).toString();
		}
		return hour;
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
