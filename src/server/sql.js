const Sequelize = require('sequelize');
const Courses = require('./courses');

//MySQL ORM Interface
const Db = new Sequelize('REGISTRATION', 'student', 'intoPDX411', {
  host: '35.236.96.52',
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
    title: Sequelize.STRING,
    professor: Sequelize.STRING,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    days: Sequelize.STRING
  }, {
    timestamps: false,
    freezeTableName: true, //Allows the tableName to be defined strictly (not just the query + 's')
    tableName: 'courses'
});

module.exports = {
  Db: Db,
  Classes: Classes,

  updateAllCourseData: (filePath) => {
    let courses = Courses.parseCourseData(filePath);
    Classes.sync({force: true}).then(() => {
      Classes.bulkCreate(courses);
    });
  },

  updateAllCourseDataASync: (filePath, callback) => {
    let courses = Courses.parseCourseData(filePath);
    Classes.sync({force: true}).then(() => {
      Classes.bulkCreate(courses).then(callback);
    });
  },

  getAllCourseData: () => {
    return Classes.findAll({raw: true});
  },

  getSelectedCourseData: (courseIDs, subjects) => {
    return selectedCourses = Classes.findAll({
      where: {
        number: courseIDs,
        subject: subjects
      },
      raw: true
    });
  }
}
