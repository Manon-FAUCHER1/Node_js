//importation du module mysql
const bcrypt = require("bcryptjs");
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

//créer la relation One-to-one entre User et Student
Student.hasOne(User);
User.belongsTo(Student);

const initDb = () => {
  return sequelize
    .sync({force: true})
    .then(_ => {
      listeEtudiants.map( student => {
        Student.create(student);
      })
      listeUsers.map( user => {
        user.password = bcrypt.hashSync(user.password, 5);
        User.create(user);
      })
      console.log("Connection a la BDD réussie")
    })
    .catch((error) => {
      console.log("Erreur lors de la connection a la BDD \n" + error);
    });
};

// db.students.belongsToMany(db.lessons, { through: 'LessonStudents' });
// db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = {
  initDb,
  User,
  Lesson,
  Student
};