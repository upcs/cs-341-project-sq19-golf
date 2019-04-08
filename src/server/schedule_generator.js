const Combinatorics = require('js-combinatorics');
var bigInt = require("big-integer");
const Courses = require('./courses');
module.exports = {
  generateSchedules: (courseIDs, subjects, classes) => {
    try {
      let possibleClasses = filterClasses(courseIDs, subjects, classes);
	  for (var i = 0; i < possibleClasses.length; i++){
		  console.log(possibleClasses[i]);
		let mask = "0".repeat(168);
    	let freeHours = [mask, mask, mask, mask, mask];
        //classObj.mask.set(freeHours);
        possibleClasses[i].mask = maskWeek(possibleClasses[i], freeHours);
        let arrOnes = [countOnes(possibleClasses[i].mask[0]),
                        countOnes(possibleClasses[i].mask[1]),
                        countOnes(possibleClasses[i].mask[2]),
                        countOnes(possibleClasses[i].mask[3]),
                        countOnes(possibleClasses[i].mask[4])
                      ];
        possibleClasses[i].ones = (arrOnes);
	  }
      let possibleSchedules = Combinatorics.bigCombination(possibleClasses, subjects.length).toArray();
  	  //let possibleSchedules = permute(possibleClasses);
	  
      possibleSchedules = isolateViableSchedules(courseIDs, subjects, possibleSchedules);
  	  //filteredSchedules = filterSchedules(possibleSchedules);  => Using combinations it's unnecessary, I coded it for using permutations
  	  let arraySchedules = new Array();
  	  let mask = "0".repeat(168);
  	  let freeHours = [mask, mask, mask, mask, mask]; //a mask for each day of the week
	console.log("Test1");
  	  for (var i = 0; i < possibleSchedules.length; i++){
  		let sch = new Schedule(possibleSchedules[i], freeHours);
		console.log(sch)
  		if (sch.viable==true){arraySchedules.push(sch);}
  	  }
  	 //return filteredSchedules;
	 console.log("TEST2");
  	 return possibleSchedules;
    }
    catch (error) {
		console.log(error);
      return [];
    }
  }
}



 function filterSchedules(permutations){
  var filtered = new Array();
	for(var i = 0; i < permutations.length; i++){
	  var obj = {};
	  for(var j = 0; j < permutations[i].length; j++){

		  obj[permutations[i][j].subject + permutations[i][j].number] = permutations[i][j];
      //console.log(obj[permutations[i][j].subject + permutations[i][j].number])
	  }
	  var tmp  = obj;
	  filtered.push(Object.values(obj));
	}

	return filtered;
}


//Preliminary removal step purposed to avoid heap overflows
function filterClasses(courseIDs, subjects, classes) {
  try {

	let possibleClasses = classes.filter(classObj => {
      let subject = classObj.subject;
      let courseID = classObj.number;

      if (subjects.includes(subject) && courseIDs.includes(courseID)){
        
        return classObj
      };
    });

    return possibleClasses;
  }
  catch (error) {
    return [];
  }
}

function isolateViableSchedules(courseIDs, subjects, possibleSchedules) {
  let viableSchedules = possibleSchedules.filter(scheduleArr => {
    let tmpSubjects = subjects.slice(0);
    let tmpCourseIDs = courseIDs.slice(0);
    let len = tmpSubjects.length;

    for (let i = 0; i < len; i++) {
      let courseID = scheduleArr[i].number;
      let subject = scheduleArr[i].subject;

      let idx = findMatchingIdx(tmpSubjects, tmpCourseIDs, subject, courseID);
      if (idx !== -1) {
        tmpSubjects.splice(idx, 1); //Remove the desired element
        tmpCourseIDs.splice(idx, 1);
      }
      else break;
    }

    if (tmpSubjects.length === 0) return scheduleArr;
  });

  return viableSchedules;
}

function findMatchingIdx(arr1, arr2, query1, query2) {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1[i] === query1 && arr2[i] === query2) return i;
  }
  return -1;
}

/*
	Efficient permutation from  Solution 61: https://stackoverflow.com/questions/9960908/permutations-in-javascript
	based on: http://homepage.math.uiowa.edu/~goodman/22m150.dir/2007/Permutation%20Generation%20Methods.pdf
	*/

function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

class Schedule {
  constructor(courses, week){
    this.courses = courses;
  	this.week = week;
  	this.totalOnes = [0, 0, 0, 0, 0];
  	var arrayMasks = new Array(courses.length);
  	//get the mask of every course in the array into a new array to perform bitwise operation
  	for(var i = 0; i < courses.length; i++){
      //mask is five dimensional array
  		arrayMasks[i] = courses[i].mask;
  		this.totalOnes[0] += courses[i].ones[0];
  		this.totalOnes[1] += courses[i].ones[1];
  		this.totalOnes[2] += courses[i].ones[2];
  		this.totalOnes[3] += courses[i].ones[3];
  		this.totalOnes[4] += courses[i].ones[4];
  	}

	this.viable = checkMask(arrayMasks, this.totalOnes);

  }
}

function countOnes(mask){
	return (mask.split('1').length - 1); //count total 1s in the mask of a day
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




function checkMask(arrayMasks, totalOnes){
  var dayMask = [[],[],[],[],[]];
    for(var i = 0; i < arrayMasks.length; i++){
        //join all masks corresponding to the same day of week

         dayMask[0].push(arrayMasks[i][0]);
         dayMask[1].push(arrayMasks[i][1]);
         dayMask[2].push(arrayMasks[i][2]);
         dayMask[3].push(arrayMasks[i][3]);
         dayMask[4].push(arrayMasks[i][4]);
    }
      for(var j = 0; j < 5; j++){
				//accumulator and current are binary strings
			var orMask = dayMask[j].reduce(function(accumulator, current) { return (bigInt(accumulator, 2).or(bigInt(current, 2))).toString(2);}); //bitwise AND on all masks
			if (totalOnes[j] != countOnes(orMask)){
				return false; // if putting the schedules together yields less occupied hours than each course total hours -> some courses overlap
			}
      }
  return true;

}
