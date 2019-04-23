const Sequelize = require('sequelize');
const Courses = require('./courses');
const Fs = require('fs')

//MySQL ORM Interface
const Db = new Sequelize('REGISTRATION', 'root', 'Gatolocoe#4209', {
  host: '35.203.158.166',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false, //Allows for string refs to be used in addition to Sybmol() objects
  logging: false //Prevents annoying SQL statements unnecessarily filling the server's console
});
//Sequelize Table Reference

const Classes = Db.define('course', {
    subject: Sequelize.STRING,
    number: Sequelize.STRING,
	  section: Sequelize.STRING,
    title: Sequelize.STRING,
	  crn: Sequelize.STRING,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    days: Sequelize.STRING,
	  professor: Sequelize.STRING,
	  location: Sequelize.STRING,
	  credits: Sequelize.STRING,
    mask: {
      type: Sequelize.STRING(1000),
      get: function() {
        return JSON.parse(this.getDataValue('mask'));
      },
      set: function(val) {
        return this.setDataValue('mask', JSON.stringify(val));
      }
    },
    ones: {
      type: Sequelize.STRING(176),
      get: function() {
        let onesStr = JSON.parse(this.getDataValue('ones'));
        return onesStr.map(el => parseInt(el));
      },
      set: function(val) {
        return this.setDataValue('ones', JSON.stringify(val));
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true, //Allows the tableName to be defined strictly (not just the query + 's')
    tableName: 'courses'
});

function parseCourseData(filePath) {
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

        return new Courses.Course(...fields);
        /*return new Course(fields[0].toUpperCase().trim(), fields[1].trim(), fields[2].toUpperCase().trim(), fields[3].trim(),
        fields[4].trim(), fields[5].toLowerCase().trim(), fields[6].toLowerCase().trim(), fields[7].toUpperCase().trim(),
        fields[8].trim(), fields[9].trim(), fields[10].trim());*/
  });
}

module.exports = {
  Db: Db,
  Classes: Classes,

  updateAllCourseData: (filePath) => {
    try {
      let courses = parseCourseData(filePath);
      Classes.sync({force: true}).then(() => {
        Classes.bulkCreate(courses);
      });
    }
    catch (error) {
      return false;
    }
  },

  updateAllCourseDataAsync: (filePath, callback) => {
    try {
      let courses = parseCourseData(filePath);
      Classes.sync({force: true}).then(() => {
        Classes.bulkCreate(courses).then(callback);
      });
    }
    catch (error) {
      return false;
    }
  },

  getAllCourseData: (mock) => {
    let mockRef = mock || false;
    if (!mockRef) return Classes.findAll({raw: true});
  },

  getSelectedCourseData: (courseIDs, subjects) => {
    if (courseIDs != null && subjects != null) {
      return Classes.findAll({
        where: {
          number: courseIDs,
          subject: subjects
        },
        raw: true
      });
    }
    else return [];
  }
}
