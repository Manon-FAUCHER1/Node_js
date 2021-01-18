const privateKey = require("../config/private-key");
const jwt = require("jsonwebtoken");
const { User } = require("../models/db");

module.exports = (req, res, next) => {
  console.log("Requete pour page protégée");
  const token = req.headers["x-access-token"];

  if (!token) {
    const message = "Vous n'avez pas fourni de jeton d'authentification.";
    return res.status(401).json({ message });
  }

  jwt.verify(token, privateKey.privateKey, async (error, decodedToken) => {
    if (error) {
      const message =
        "L'Utilisateur n'est pas autorisé a accesder a cette page";
      return res.status(401).json({ message, data: error.message });
    }
    
    const userId = decodedToken.userId;
    const user_from_token = await User.findByPk(userId);
    if (!user_from_token) {
        const message = "Votre compte n'existe plus. Vous n'êtes pas autoriser à acceder a cette page.";
        return res.status(401).json({message});
    }

    res.locals.id = userId;
    next();

  });
};
