module.exports = erreurCall = (error, res) => {
    const message = "Une erreur est apparue dans votre requette. Veillez retenter plus tard";
    console.log(error);
    return res.status(500).json({ message, error : error.message});
}