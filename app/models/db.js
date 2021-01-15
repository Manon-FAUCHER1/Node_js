//importation du module mysql

const Sequelize = require('sequelize');
const dbConfig = require("../config/db.config");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
});

// open the MySQL connection
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.students = require("./students.model")(sequelize, Sequelize);
db.lessons = require("./lessons.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);

//créer la relation One-to-one entre User et Student
db.students.hasOne(db.users);
db.users.belongsTo(db.students);

db.students.belongsToMany(db.lessons, { through: 'LessonStudents' });
db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = db;