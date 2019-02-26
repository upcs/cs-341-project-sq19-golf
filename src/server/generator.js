//Written by Andrew Tagawa on 2/25/19
//NB: Might not work

function generate(arr,crs,n){
	//arr = full course array, crs = array of desired courses, n = number of submitted courses
	var max = arr.length; //length of the total course array
	var len = n; //length of the schedule to be made
	var out = ""; //function output
	var mwfTimes = []; //times of MWF courses
	var trTimes = []; //times of TR courses
	var courses = []; //list of desired courses
	var mwfCourses = []; //courses that take place on MWF
	var trCourses = []; //courses that take place on TR
	
	//iterates through the array of courses with data from the database to get complete course data
	for(var i = 0; i < len; i++){
		for(var j = 0; i < arr.length; j++){
			if(crs[i].name.localeCompare(arr[j].name) == 0){
				courses[i] = arr[j]; //inserts selected courses into their own array
			}
		}
	}
	
	//iterates through the times of the desired courses to see if there is a conflict and adds if 
	//there is not one.
	for(var i = 0; i < len; i++){
		if(courses[i].days = 'MWF'){
			for(var j = 0; j < mwfTimes.length; j++){
				if(courses[i].start == mwfTimes[j]){
					out = "ERROR: Conflicting times";
					return out;
				}
			}
			mwfTimes.push(courses[i].start);
			mwfCourses.push(courses[i]);
		}
		
		if(courses[i].days = 'TR'){
			for(var j = 0; j < trTimes.length; j++){
				if(courses[i].start == trTimes[j]){
					out = "ERROR: Conflicting times";
					return out;
				}
			}
			trTimes.push(courses[i].start);
			trCourses.push(courses[i]);
		}
		
		if(courses[i].days = 'MTWR'){
			for(var j = 0; j < mwfTimes.length; j++){
				if(courses[i].start == mwfTimes[j]){
					out = "ERROR: Conflicting times";
					return out
				}
			}
			for(var j = 0; j < trTimes.length; j++){
				if(courses[i].start == trTimes[j]){
					out = "ERROR: Conflicting times";
					return out;
				}
			}
			mwfTimes.push(courses[i].start);
			mwfCourses.push(courses[i]);
			trTimes.push(courses[i].start);
			trCourses.push(courses[i]);
		}
	}
	
	console.log(mwfCourses);
	console.log(trCourses);
	
	//makes schedule html for MWF
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
	
	//makes schedule html for TR
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
	
	//returns html;
	return out;
}