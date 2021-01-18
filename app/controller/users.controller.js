const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/db");
const erreurCall = require("../services/call.services");
const privateKey = require("../config/private-key");
const { checkDuplicateEmail } = require("../services/user.services");
const studentMethodes = require("./students.controller");

exports.createProfil = async (req, res) => {
  try {
    const id = res.locals.id;
    const user = await User.findByPk(id);
    const userProfil = await studentMethodes.create(req.res);
    await user.setStudent(userProfil);
    const message = "Votre étudient a bien été créé.";
    res.json({
      message,
      newStudentProfil : userProfil
    })
  } catch (error) {
    erreurCall(error, res);
  }
};

exports.login = async (
  req,
  res,
  userRegister = null,
  messageRegister = null
) => {
  if (req.body.email && req.body.password) {
    try {
      let user;

      if (userRegister != "object") {
        user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
          return res.status(404).json({
            message: "Cet email ne correspond a aucun compte.",
          });
        }

        const verifPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!verifPassword) {
          const message = "Le mot de passe est incorrect";
          return res.status(401).json({ message });
        }
      } else {
        // si l'appel API vient de /register
        user = userRegister;
      }

      const token = jwt.sign({ userId: user.id }, privateKey.privateKey, {
        expiresIn: "24h",
      });

      const message =
        typeof messageRegister === "string"
          ? messageRegister
          : "Vous vous etes bien identifié - Merci de récupérer le token pour vos futurs requetes sur l'API.";
      res.json({
        message,
        data: user,
        token,
      });
    } catch (error) {
      erreurCall(error, res);
    }
  } else {
    res
      .status(400)
      .json(
        "Demande de login annulée. Merci de renseigner votre email et votre mdp."
      );
  }
};

exports.register = async (req, res) => {
  if (req.body.email && req.body.password && req.body.type) {
    try {
      const emailUsed = await checkDuplicateEmail(req, res);
      if (!emailUsed) {
        const user = await User.create({
          email: req.body.email,
          type: req.body.type,
          password: bcrypt.hashSync(req.body.password, 8),
        });

        this.login(
          req,
          res,
          user,
          "Votre compte a bien été créé. Vous avez été directement authentifié. Vous pouvez des maintenant récuperer le token pour vos requetes sur l'API."
        );
      }
    } catch (error) {
      erreurCall(error, res);
    }
  } else {
    const message =
      "Demande d'inscription échouée. Merci de renseigner tous les champs nécessaire.";
    res.status(400).json({ message });
  }
};

exports.getInfo = async (req, res) => {
  try {
    const id = res.locals.id;
    const user = await User.findByPk(id);
    const message = "Vos infos ont bien été récupérées.";
    res.json({
      message,
      user,
    });
  } catch (error) {
    erreurCall(error, res);
  }
};
