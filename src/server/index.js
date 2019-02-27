const express = require('express');
const os = require('os');
const mysql = require('mysql');
const sequelize = require('sequelize');

//MySQL Setup
/*sql = mysql.createConnection({
  host: '35.236.96.52',
  user: 'student',
  password: 'intoPDX411',
  database: 'REGISTRATION'
});

sql.connect();*/

/*sql.query('SELECT * FROM  `courses`', function (error, results, fields) {
  console.log(results);
});*/

const db = new sequelize('REGISTRATION', 'student', 'intoPDX411', {
  host: '35.236.96.52',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
});

const classes = db.define('course', {
    subject: sequelize.STRING,
    number: sequelize.STRING,
    title: sequelize.STRING,
    professor: sequelize.STRING,
    start: sequelize.STRING,
    end: sequelize.STRING,
    days: sequelize.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'courses'
});

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

var fs = require('fs');
//read file and store in variable *data
var data = fs.readFileSync("./dump.csv", "utf-8");
//store each line of file into an element of the array respectively
var dataByLine = data.split("\n");
//assign variable *lines as an array
var lines = dataByLine;
//assign variable *courses as an array of type Course class Objects
var courses = new Array(Course);
var i;
//iterate through *lines
for(i = 0; i < lines.length-1; i++) {
    //for each element of *courses store a Course Object from an element of *lines, respectively
    var fields = lines[i].split(",");
    //console.log(fields);
    courses[i] = new Course(fields[0].toUpperCase().trim(), fields[1].trim(), fields[2].trim(), fields[3].trim(), fields[4].toLowerCase().trim(), fields[5].toLowerCase().trim(), fields[6].toUpperCase().trim());

}

//console.log(...courses);
//classes.bulkCreate(courses);


classes.findAll({raw: true}).then(course => {
  console.log(course);
});

const app = express();

app.use(express.static('dist'));

//Client Side Post
app.get('/api/getSchedules', (req, res) => {
  //TODO: Finish routing
  res.send({ username: os.userInfo().username });
});

//Redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
