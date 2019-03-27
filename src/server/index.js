const Express = require('express');
const Os = require('os');
const Path = require('path');
const BodyParser = require('body-parser')
const Sql = require('./sql');
const ScheduleGen = require('./schedule_generator');

const app = Express();

app.use(Express.static('dist'));
app.use(BodyParser.json());

updateDB();

//Client Side Post
app.post('/api/scheduleRequest', (req, res) => {
  getViableSchedulesAsync(req.body, viableSchedules => {
    console.log(viableSchedules);
    res.json(viableSchedules);
  });
});

app.post('/api/allCoursesRequest', (req, res) => {
  getAllCoursesAsync(courses => {
    res.json(courses);
  });
});

//Redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

//let desiredClasses = [['BIO', '278'], ['BIO', '304'], ['BIO', '277']];
//let viableSchedules = getViableSchedulesAsync(desiredClasses);

//TODO: Update from desiredClasses to courseID/subject
async function updateDB() {
  //Update course data
  let dataPath = Path.join('web_scraper', 'dump.csv');
  await Sql.updateAllCourseData(dataPath);
}

async function getAllCoursesAsync(callback) {
  //Get all courses
  let courses = await Sql.getAllCourseData();
  callback(courses);
}

async function getViableSchedulesAsync(desiredClasses, callback) {
  //Get selected course data
  let subjects = desiredClasses.map(x => x.subject);
  let courseIDs = desiredClasses.map(x => x.courseID);
  let courses = await Sql.getSelectedCourseData(courseIDs, subjects);

  //Generate viable schedules
  let viableSchedules = await ScheduleGen.generateSchedules(courseIDs, subjects, courses);

  if (callback) callback(viableSchedules);
}
