const { Student } = require("../models/db");
const { getAge } = require("../services/students.services");
const erreurCall = require("../services/call.services");

/******************************************
 ***************** GetAll ******************
 *******************************************/
exports.getAll = async (req, res) => {
  try {
    let listeEtudiants = await Student.findAll();
    if (!listeEtudiants.length) {
      const message = "La liste des étudiants est vide";
      return res.json(message);
    }

    listeEtudiants = listeEtudiants.map((etudiant) => {
      etudiant.age = getAge(etudiant.birthdate);
      return etudiant;
    });

    const message = `Liste des étudients : ${listeEtudiants.length} étudiants récupéré.`;
    res.json({ message, listeEtudiants });
  } catch (error) {
    erreurCall(error, res);
  }
};

/******************************************
 **************** GetById ******************
 *******************************************/

exports.getById = async (req, res) => {
  try {
    let etudiant = await Student.findByPk(req.params.id);
    if (etudiant === null) {
      const message =
        "L'étudiant que vous avez demmandé n'existe pas. Veillez essayer avec un autre ID.";
      res.status(400).json(message);
    }
    etudiant.age = getAge(etudiant.birthdate);
    const message = "Profile de l'étudiant demandé :";
    res.json({ message, etudiant });
  } catch (error) {
    erreurCall(error, res);
  }
};

/*******************************************
 ***************** Create ******************
 *******************************************/
exports.create = async (req, res) => {
    try {

      const etudiant = await Student.create(req.body);
      return etudiant;

    } catch (error) {
      erreurCall(error, res);
    }
};







// exports.addLesson = async (req, resp) => {
//   try {
//     let student = await Student.findByPk(req.params.id2);
//     let lesson = await Lesson.findByPk(req.params.id1);
//     await lesson.setStudents(student);
//     let lessons = await student.getLessons();
//     resp.json(lessons);
//   } catch (e) {
//     console.log(e);
//     resp.status(500);
//     resp.json({ error: e });
//   }
// };

//     res.json(newResult);
//   } catch (e) {
//     res.json(500);
//     res.json({ error: e });
//   }
// };

// exports.update = async (req, res) => {
//   try {
//     await Student.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.json({ id: req.params.id, ...req.body });
//   } catch (e) {
//     resp.json(500);
//     resp.json({ error: e });
//   }
// };

// exports.remove = async (req, resp) => {
//   try {
//     await Student.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(200);
//     res.json({ message: "element removed" });
//   } catch (e) {
//     resp.json(500);
//     resp.json({ error: e });
//   }
// };
