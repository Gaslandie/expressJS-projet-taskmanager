/* eslint-disable max-len */
const notFound = (req, res)=>res.status(404).send("Route does not exist"); // si la route n'existe pas


module.exports = notFound;
