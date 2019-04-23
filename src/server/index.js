const Express = require('express');
const Os = require('os');
const Path = require('path');
const BodyParser = require('body-parser')
const Sql = require('./sql');
const ScheduleGen = require('./schedule_generator');

const Courses = require('./courses'); // LOCAL WORK

const app = Express();

//updateDB();

app.use(Express.static('dist'));
app.use(BodyParser.json());

//Client Side Post
app.post('/api/scheduleRequest', (req, res) => {
  getViableSchedulesAsync(req.body, viableSchedules => {
    //console.log(viableSchedules);
    res.json(viableSchedules);
  });
});

app.post('/api/allCoursesRequest', (req, res) => {
  getAllCoursesAsync(courses => {
    let subjMap = { all: [] }, numMap = { all: [] };
    courses.forEach(course => {
      let courseSubj = course.subject, courseNum = course.number;

      //Populate course subject map
      if (subjMap[courseSubj] && !subjMap[courseSubj].includes(courseNum)) {
        subjMap[courseSubj].push(courseNum);
      }
      else if (!subjMap[courseSubj]) subjMap[courseSubj] = [courseNum];
      if (!subjMap.all.includes(courseNum)) subjMap.all.push(courseNum); //Only add unique refs

      //Populate course number map
      if (numMap[courseNum] && !numMap[courseNum].includes(courseSubj)) {
        numMap[courseNum].push(courseSubj);
      }
      else if (!numMap[courseNum]) numMap[courseNum] = [courseSubj];
      if (!numMap.all.includes(courseSubj)) numMap.all.push(courseSubj); //Only add unique refs
    });

    res.json({ subjMap, numMap });
  });
});

//Redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

//TODO: Update from desiredClasses to courseID/subject
async function updateDB() {
  //Update course data
  let dataPath = Path.join('web_scraper', 'course_dump.csv');
  await Sql.updateAllCourseData(dataPath);
}

async function getAllCoursesAsync(callback) {
  //Get all courses
  let courses = await Sql.getAllCourseData();
  callback(courses);
}

async function getViableSchedulesAsync(data, callback) {
  //NICO: data should have a property called constraints with everything you need
  console.log(data.constraints);

  //Get selected course data
  let desiredClasses = data.desiredCourses;
  let subjects = desiredClasses.map(x => x.subject);
  let courseIDs = desiredClasses.map(x => x.courseID);
  let courses = await Sql.getSelectedCourseData(courseIDs, subjects);

  //Generate viable schedules
  let viableSchedules = await ScheduleGen.generateSchedules(courseIDs, subjects, courses, data.constraints);
  if (callback) callback(viableSchedules);
}
