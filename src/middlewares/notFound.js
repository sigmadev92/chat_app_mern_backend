const routeNotFound = (req, res, next) => {
  return res.status(400).send({ success: false, message: "Invalid route" });
};

export default routeNotFound;
