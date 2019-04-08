const Fs = require('fs')
//Course Abstraction
class Course {
  constructor(sub, number, section, title, crn, start, end, d, prof, location, credits){
    this.subject = sub;
    this.number = number;
    this.section = section;
    this.title = title;
    this.crn = crn;
    this.start = ampm(start) + ":" + start.split(":")[1];
    this.end = ampm(end) + ":" + end.split(":")[1];
    this.days = d;
    this.professor = prof;
    this.location = location;
    this.credits = credits
		//availability mask initialized to 0 => all available by default
		this.mask = ["0".repeat(168), "0".repeat(168), "0".repeat(168), "0".repeat(168), "0".repeat(168)] ;
		//each course's mask reflects the time gaps that the course takes
		this.mask = maskWeek(this, this.mask);
		//count the total number of 1s in the mask at object instantiation time : compute only once and avoid doing it later to compare viability of a full schedule
		this.ones = [countOnes(this.mask[0]), countOnes(this.mask[1]), countOnes(this.mask[2]), countOnes(this.mask[3]), countOnes(this.mask[4])];
		//console.log(this.ones);
  }
}

function countOnes(mask){
	//console.log(mask.split('1').length - 1);
	return (mask.split('1').length - 1); //count total 1s in the mask of a day
}

function ampm(time){
	//Add 12 to hour if it's PM -> makes it easier to handle schedule binary array representation
	var hour = time.split(":")[0];
	var minute = time.split(":")[1];
	var ap = minute.split(" ")[1];
	minute = minute.split(" ")[0];
	if (ap.localeCompare("pm") == 0 && hour != 12){
		hour = (parseInt(hour) + 12).toString();
	}
	return hour;
}

function maskWeek(course, freeHours){
	if (course.days.includes("M")){
		freeHours[0] = maskDay(course, freeHours[0]);
	}

	if (course.days.includes("T")){
		freeHours[1] = maskDay(course, freeHours[1]);
	}

	if (course.days.includes("W")){
		freeHours[2] = maskDay(course, freeHours[2]);
	}

	if (course.days.includes("R")){
		freeHours[3] = maskDay(course, freeHours[3]);
	}

	if (course.days.includes("F")){
		freeHours[4] = maskDay(course, freeHours[4]);
	}
	return freeHours;
}

function maskDay(course, mask){
	/*MASKS:
          *binary string of 168b :

          - classes only between 8 am and 10 pm = 14 hours
          - split hours in chunks of 5 min -> 12 chunks * 14 hours = 168 chunks

          *Logic from hour to array and from array to hour:

          - mask positions 0-11 are for 8 am
          - mask positions 12-23 are for 9 am
          - ...
          -  mask index i -> minute : hour
                          floor(i/12) : 5x(i(mod 12))

          - hour : minute -> mask index i
              if hour > 15 : i = ( 12 x (hour(mod 8) + 8) ) + floor(minute/5)
              else: i = ( 12 x hour(mod 8) ) + floor(minute/5)
	*/

	var startHour = parseInt(course.start.split(":")[0]);

	var startMinute = parseInt(course.start.split(":")[1].split(" ")[0]);
	var endHour = parseInt(course.end.split(":")[0]);
	var endMinute = parseInt(course.end.split(":")[1].split(" ")[0]);

	var leftIndex = 12 * (startHour % 8) + Math.floor(startMinute/5);
	if (startHour > 15) {leftIndex += 12*8;}

	var rightIndex = 12 * (endHour % 8) + Math.floor(endMinute/5);
	if (endHour > 15) {rightIndex += 12*8;}

	//console.log(course.number.toString() + " " +  leftIndex.toString() + " " + rightIndex.toString())
	filledMask = fillMask(mask, leftIndex, rightIndex);
	return filledMask
}

function fillMask(mask, start, end){
	aux = mask.split('');
	for (var i = start; i <= end; i++){
		// <= end requires 5 minutes between classes
		// < end allows overlap (end at 2:15, start next at 2:15)
		aux[i] = "1";
	}
	return aux.join('');
}

module.exports = {
  parseCourseData: (filePath) => {
    //Extract file data
    let data = Fs.readFileSync(filePath, "utf-8");
    var lines = data.split("\n");

    //Parse file data
    return lines.filter(line => line != '')
                .map(line => {
                     let fields = line.split(",");
                     fields.forEach(el => el.trim())

                	   //AS,001,A,Air Force ROTC Physical Training,41466,6:30 am,7:30 am,M,John David Anthony  Gasa ,Chiles Center MEZ,1.000
                	 	 //Course constructor(sub, id, name, prof, start, end, d)
                     return new Course(...fields);
                });
  }
}
