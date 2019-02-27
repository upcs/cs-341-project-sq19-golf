//Last edited on 2/26/19

/*Assumed course object structure:
constructor(sub, id, name, prof, start, end, d){
		this.subject = sub;
		this.number = id;
		this.title = name;
		this.professor = prof;
		this.start = start;
		this.end = end;
		this.days = d;
}
*/

function generate(arr,crs){
	//arr = full course array, crs = array of desired courses
	var max = arr.length; //length of the total course array
	var len = crs.length; //length of the schedule to be made
	var out = ""; //function output
	var mwfTimes = []; //times of MWF courses (24 hr format)
	var trTimes = []; //times of TR courses (24 hr format)
	var courses = []; //postselection list of desired courses
	var mwfCourses = []; //courses that take place on MWF
	var trCourses = []; //courses that take place on TR
	var dupe = 0; //duplicate detector: 0 = false, 1 = true

	//iterates through the full array of courses from the database to get complete course data
	for(var i = 0; i < len; i++){
		dupe = 0; //resetting the duplicate detector
		for(var j = 0; i < max; j++){
			if(crs[i].name.localeCompare(arr[j].name) == 0){ //if found in list
				for(var k = 0; k < courses.length; k++){ //duplicate course detection
					if(crs[i].name.localeCompare(courses[k].name) == 0){ //duplicate found
						dupe = 1;
						console.log("Duplicate found, course not added.");
					}
					else{ //duplicate not found
						courses.push(arr[j]); //inserts found courses into their own array for conflict checking
						console.log("Duplicate not found, course added.");
					}
				}
			}
		}
	}

	//iterates through the times of the desired courses to see if there is a time conflict and adds it
	//to the related course list if there is not one.  Otherwise, it returns an error message.
	for(var i = 0; i < len; i++){
		if(courses[i].days = 'MWF'){
			for(var j = 0; j < mwfTimes.length; j++){
				if(courses[i].start == mwfTimes[j]){ //error condition and output
					out = "ERROR: Conflicting time.  Course: "+courses[i].name+" | Time: "+courses[i].time;
					return out;
				}
			}
			mwfTimes.push(courses[i].start); //adding course time to time list
			mwfCourses.push(courses[i]); //adding course to course list
		}

		else if(courses[i].days = 'TR'){
			for(var j = 0; j < trTimes.length; j++){
				if(courses[i].start == trTimes[j]){
					out = "ERROR: Conflicting time.  Course: "+courses[i].name+" | Time: "+courses[i].time";
					return out;
				}
			}
			trTimes.push(courses[i].start); //adding course time to time list
			trCourses.push(courses[i]); //adding course to course list
		}

		else if(courses[i].days = 'MTWR'){ //specifically for courses that happen on MWF as well as Tuesday
			for(var j = 0; j < mwfTimes.length; j++){
				if(courses[i].start == mwfTimes[j]){
					out = "ERROR: Conflicting time.  Course: "+courses[i].name+" | Time: "+courses[i].time";
					return out
				}
			}
			for(var j = 0; j < trTimes.length; j++){
				if(courses[i].start == trTimes[j]){
					out = "ERROR: Conflicting time.  Course: "+courses[i].name+" | Time: "+courses[i].time";
					return out;
				}
			}
			mwfTimes.push(courses[i].start); //adding course time to time list
			mwfCourses.push(courses[i]); //adding course to course list
			trTimes.push(courses[i].start); //adding course time to time list
			trCourses.push(courses[i]); //adding course to course list
		}
	}

	console.log(mwfCourses);
	console.log(trCourses);

	//makes schedule html for courses on MWF
	out += '<span class="scheduleTime">'
	for(var i= 0; i < mwfCourses.length; i++){
		out += '<div class="timeLabel">' + mwfCourses[i].start + '-' + mwfCourses[i].end + '</div>';
	}
	out += '</span>';
	out += '<span class="scheduleClass">';

	for(var i= 0; i < mwfCourses.length; i++){
		out += '<div class="classLabel">' + mwfCourses[i].subject + ' ' + mwfCourses[i].number + '</div>';
	}
	out += '</span>';

	//makes schedule html for courses TR
	out += '<span class="scheduleTime">'
	for(var i= 0; i < trCourses.length; i++){
		out += '<div class="timeLabel">' + trCourses[i].start + '-' + trCourses[i].end + '</div>';
	}
	out += '</span>';
	out += '<span class="scheduleClass">';

	for(var i= 0; i < trCourses.length; i++){
		out += '<div class="classLabel">' + trCourses[i].subject + ' ' + trCourses[i].number + '</div>';
	}
	out += '</span>';

	//returns formatted schedule;
	return out;
}
