module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("lesson", {
   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    title: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
        },
    teacher: {
    type : Sequelize.STRING
      },
     file_name: {
    type : Sequelize.STRING
        },
        starting_date: {
            type:Sequelize.DATE
        
        },
        ending_date: {
            type:Sequelize.DATE
        }
        

  });
  return Student;
};