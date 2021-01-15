const express = require('express');
const bodyParser = require('body-parser');
// const students = require('./app/routers/students.router.js');
// const lessons = require('./app/routers/lessons.router.js');
// const users = require('./app/routers/users.router.js');
const { initDb } = require("./app/models/db.js");

const app = express();
app.use(bodyParser.json())

initDb();

// app.use('/students', students);
// app.use('/lessons', lessons);
// app.use('/auth', users);

// db.sequelize.sync();

app.listen(8080);

