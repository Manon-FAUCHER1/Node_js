//importation du module mysql
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");
const studentModel = require("./students.model.js");
const usertModel = require("./users.model.js");
const lessonModel = require("./lessons.model.js");

const listeEtudiants = require("../config/test/liste.etudiants");
const listeUsers = require("../config/test/liste.users");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
  host: dbConfig.HOST,
  dialect: "mysql",
  logging : false
  }
);

const Student = studentModel(sequelize, DataTypes);
const User = usertModel(sequelize, DataTypes);
const Lesson = lessonModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize
    .sync({force: true})
    .then(_ => {
      // listeEtudiants.map( student => {
      //   Student.create(student);
      // })
      // listeUsers.map( user => {
      //   User.create(user);
      // })
      console.log("Connection a la BDD réussie")
    })
    .catch((error) => {
      console.log("Erreur lors de la connection a la BDD \n" + error);
    });
};

//créer la relation One-to-one entre User et Student
// db.students.hasOne(db.users);
// db.users.belongsTo(db.students);

// db.students.belongsToMany(db.lessons, { through: 'LessonStudents' });
// db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = {
  initDb,
  User,
  Lesson,
};