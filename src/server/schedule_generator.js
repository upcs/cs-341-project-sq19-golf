const Combinatorics = require('js-combinatorics');

module.exports = {
  generateSchedules: (courseIDs, subjects, classes) => {
    try {
      let possibleClasses = filterClasses(courseIDs, subjects, classes);
      let possibleSchedules = Combinatorics.bigCombination(possibleClasses, subjects.length).toArray();
      return isolateViableSchedules(courseIDs, subjects, possibleSchedules);
    }
    catch (error) {
      return {};
    }
  }
}

//Preliminary removal step purposed to avoid heap overflows
function filterClasses(courseIDs, subjects, classes) {
  try {
    let possibleClasses = classes.filter(classObj => {
      let subject = classObj.subject;
      let courseID = classObj.number;

      if (subjects.includes(subject) && courseIDs.includes(courseID)) return classObj;
    });

    return possibleClasses;
  }
  catch (error) {
    return {};
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
